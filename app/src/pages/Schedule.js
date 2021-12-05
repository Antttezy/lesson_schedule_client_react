import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Router, Routes } from "react-router"
import { getAccessToken } from "../api/authentication"
import { getLessons } from "../api/lessons"
import Button from "../components/Button"
import InputField from "../components/InputField"
import LessonsList from "../components/LessonsList"
import Navbar from "../components/Navbar"
import { UpdateAccessToken } from "../redux/authentication/actions"
import { ROLES } from "../redux/authentication/constants"
import CreateLesson from "./CreateLesson"

function RootPage() {
    var date = new Date()
    date.setDate(date.setDate() + 1)

    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()

    const [beginTime, setBeginTime] = useState(-1)
    const [endTime, setEndTime] = useState(-1)

    const [lessons, setLessons] = useState([])
    const [lessonsLoaded, setLessonsLoaded] = useState(false)

    const [create, setCreate] = useState(false)

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
            const data = await getLessons(token, beginTime, endTime)
            setLessons(_ => data.lessons)
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

    function createLessonClick() {
        setCreate(_ => true)
    }

    useEffect(
        () => {
            fetchLessons()
        },
        [])

    if (create) {
        return <Navigate to='/schedule/create' />
    }

    return (
        <>
            <InputField type='date' className='' changeHandler={(dt) => changeBeginTime(dt)} />
            <InputField type='date' className='' changeHandler={(dt) => changeEndTime(dt)} />
            <Button caption='Поиск по дате' enabled={true} clickHandler={() => searchLessons()} />
            <Button caption='Назначить' enabled={true} clickHandler={() => createLessonClick()} />
            <LessonsList lessons={lessons} loaded={lessonsLoaded} />
        </>
    );
}

export default function Schedule() {
    const authentication = useSelector(store => store.authenticationReducer)

    if (!authentication.isLoggedIn) {
        return <Navigate to='/login' />
    }

    if (!authentication.role === ROLES.TEACHER) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<RootPage />} />
                <Route path='create' element={<CreateLesson />} />
            </Routes>
        </>
    );
}