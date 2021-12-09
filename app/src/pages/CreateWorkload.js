import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessToken } from "../api/authentication";
import { createSubject, listSubjects } from "../api/subjects";
import { createWorkload } from "../api/workloads";
import { UpdateAccessToken } from "../redux/authentication/actions";

export function CreateWorkload() {
    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()

    const [description, setDescription] = useState('')
    const [hours, setHours] = useState(0)
    const [subject, setSubject] = useState(-1)
    const [created, setCreated] = useState(false)

    const [subjects, setSubjects] = useState([])
    const [subjectName, setSubjectName] = useState('')

    function handleDescription(e) {
        e.preventDefault()
        setDescription(_ => e.target.value)
    }

    function handleName(e) {
        e.preventDefault()
        setSubjectName(_ => e.target.value)
    }

    function handleHours(e) {
        e.preventDefault()
        setHours(_ => e.target.value)
    }

    async function workloadCreate() {
        async function create(accessToken) {
            await createWorkload(accessToken, {
                description,
                subjectId: subject,
                hours
            })

            setCreated(_ => true)
        }

        try {
            await create(authentication.accessToken)
        } catch (err) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await create(newToken)
            } catch (err) {
                console.log(err)
            }
        }
    }

    function submitWorkload(e) {
        e.preventDefault()

        if (subject > 0) {
            workloadCreate()
        }
    }

    async function fetchSubjects() {
        async function fetch(accessToken) {
            let response = await listSubjects(accessToken)
            setSubjects(_ => response.subjects)
        }

        try {
            await fetch(authentication.accessToken)
        } catch (e) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await fetch(newToken)
            } catch (e) {

            }
        }
    }

    function selectSubject(e) {
        setSubject(_ => e.target.value)
    }

    useEffect(() =>
        fetchSubjects(),
        // eslint-disable-next-line
        [])

    async function subjectCreate() {
        async function create(accessToken) {
            let data = await createSubject(accessToken, {
                name: subjectName
            })

            setSubjects(sub => [
                {
                    id: data.id,
                    name: data.name
                },
                ...sub
            ])

            setSubjectName(_ => '')
        }

        try {
            await create(authentication.accessToken)
        } catch (err) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await create(newToken)
            } catch (err) {
                console.log(err)
            }
        }
    }

    function submitSubject(e) {
        e.preventDefault()
        subjectCreate()
    }


    if (created) {
        return <Navigate to='/workloads' />
    }

    return (
        <div>
            <form>
                <input type="text" value={description} onChange={handleDescription} placeholder='описание' />
                <select onChange={selectSubject}>
                    <option value='-1'>не выбрано</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="number" value={hours} onChange={handleHours} />
                <button type='submit' onClick={submitWorkload}>Создать</button>
            </form>

            <form>
                <input type="text" value={subjectName} onChange={handleName} placeholder='название предмета' />
                <button type='submit' onClick={submitSubject}>Создать</button>
            </form>
        </div>
    )
}