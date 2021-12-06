import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { getAccessToken } from "../api/authentication"
import { getGroups } from "../api/groups"
import { createLesson } from "../api/lessons"
import { listWorkloads } from "../api/workloads"
import InputField from "../components/InputField"
import { UpdateAccessToken } from "../redux/authentication/actions"

export default function CreateLesson() {
    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()

    const [date, setDate] = useState('2000-01-01')
    const [time, setTime] = useState('09:00')

    const [groups, setGroups] = useState([])
    const [groupsLoaded, setGroupsLoaded] = useState(false)
    const [group, setGroup] = useState(-1)

    const [workloads, setWorkloads] = useState([])
    const [workloadsLoaded, setWorkloadsLoaded] = useState(false)
    const [workload, setWorkload] = useState(-1)

    const [success, setSuccess] = useState(false)


    function onDateChange(dt) {
        setDate(_ => dt)
    }

    function onTimeChange(dt) {
        setTime(_ => dt)
    }

    async function createClick(e) {
        e.preventDefault()

        if (group < 0 || workload < 0) {
            return
        }

        const datetime = new Date(`${date} ${time}`).getTime()

        try {
            let response = await createLesson(authentication.accessToken, {
                workloadId: workload,
                groupId: group,
                lessonTime: datetime
            })
            setSuccess(_ => true)

        } catch (e) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                let response = await createLesson(authentication.accessToken, {
                    workloadId: workload,
                    groupId: group,
                    lessonTime: datetime
                })
                setSuccess(_ => true)

            } catch (e) {

            }
        }
    }

    async function fetchGroups() {
        async function fetch(accessToken) {
            let data = await getGroups(accessToken)
            setGroups(_ => data.groups)
            setGroupsLoaded(_ => true)
        }

        try {
            await fetch(authentication.accessToken)

        } catch (error) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await fetch(newToken)

            } catch (error) {

            }
        }
    }

    async function fetchWorkloads() {
        async function fetch(accessToken) {
            let data = await listWorkloads(accessToken)
            setWorkloads(_ => data.workloads)
            setWorkloadsLoaded(_ => true)
        }

        try {
            await fetch(authentication.accessToken)

        } catch (err) {
            const newToken = await getAccessToken(authentication.refreshToken)
            dispatch(UpdateAccessToken(newToken))
            await fetch(newToken)

        }
    }

    useEffect(() => {
        fetchGroups()
        fetchWorkloads()
    },
        [])

    function groupChanged(e) {
        e.preventDefault()
        setGroup(_ => e.target.value)
    }

    function workloadChanged(e) {
        e.preventDefault()
        setWorkload(_ => e.target.value)
    }

    if (success) {
        return <Navigate to='/schedule' />
    }

    return (
        <form>
            <InputField type='date' className='' changeHandler={(dt) => onDateChange(dt)} defaultValue={date} />
            <InputField type='time' className='' changeHandler={(dt) => onTimeChange(dt)} defaultValue={time} />
            <select onChange={groupChanged} value={group}>
                <option value="-1">не выбрано</option>
                {groupsLoaded ?
                    groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>) :
                    null}
            </select>
            <select onChange={workloadChanged} value={workload}>
                <option value="-1">не выбрано</option>
                {workloadsLoaded ?
                    workloads.map(w => <option key={w.id} value={w.id}>{w.subject.name} {w.hours} часов</option>) :
                    null}
            </select>
            <button type='submit' onClick={createClick}>Создать</button>
        </form>
    )
}