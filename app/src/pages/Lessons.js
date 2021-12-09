import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { getAccessToken } from "../api/authentication"
import { getMyLessons } from "../api/lessons"
import Button from "../components/Button"
import InputField from "../components/InputField"
import LessonsList from "../components/LessonsList"
import Navbar from "../components/Navbar"
import { UpdateAccessToken } from "../redux/authentication/actions"
import { ROLES } from "../redux/authentication/constants"

export default function Lessons() {
    let beginDate = new Date()
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 1)
    beginDate.setDate(beginDate.getDate() - 1)

    const [beginTime, setBeginTime] = useState(beginDate.getTime())
    const [endTime, setEndTime] = useState(endDate.getTime())
    const [lessons, setLessons] = useState([])
    const [lessonsLoaded, setLessonsLoaded] = useState(false)
    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()

    function changeBeginTime(dt) {
        let millis = new Date(dt).getTime()
        setBeginTime(d => millis)
    }

    function changeEndTime(dt) {
        let millis = new Date(dt).getTime()
        setEndTime(d => millis)
    }

    async function fetchLessons() {
        async function fetch(token) {
            setLessonsLoaded(l => false)

            if (beginTime > 0 && endTime > 0) {
                let lessons = await getMyLessons(token, beginTime, endTime)
                setLessons(l => lessons.lessons)
            } else {
                let lessons = await getMyLessons(token)
                setLessons(l => lessons.lessons)
            }

            setLessonsLoaded(l => true)
        }

        try {
            await fetch(authentication.accessToken)

        } catch (error) {
            try {
                let newAccessToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newAccessToken))
                await fetch(newAccessToken)

            } catch (error) {
                console.log(error)
            }
        }
    }

    function searchLessons() {
        fetchLessons()
    }

    useEffect(
        () => {
            fetchLessons()
        },
        // eslint-disable-next-line
        [])

    return (
        authentication.isLoggedIn === true ?
            authentication.role === ROLES.STUDENT ?
                <>
                    <Navbar />
                    <InputField type='date' className='' changeHandler={(dt) => changeBeginTime(dt)} />
                    <InputField type='date' className='' changeHandler={(dt) => changeEndTime(dt)} />
                    <Button caption='Поиск по дате' enabled={true} clickHandler={() => searchLessons()} />
                    <LessonsList lessons={lessons} loaded={lessonsLoaded} />
                </> :
                <Navigate to='/' />
            : <Navigate to='/login' />
    );
}
