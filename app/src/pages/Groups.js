import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router"
import { getAccessToken } from "../api/authentication"
import { getGroups } from "../api/groups"
import EditGroup from "../components/EditGroup"
import GroupView from "../components/GroupView"
import Navbar from "../components/Navbar"
import { UpdateAccessToken } from "../redux/authentication/actions"
import { ROLES } from "../redux/authentication/constants"
import CreateGroup from "./CreateGroup"
import NotFound from "./NotFound"


function PageRoot() {
    const authentication = useSelector(store => store.authenticationReducer)
    const [groups, setGroups] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [create, setCreate] = useState(false)
    const dispatch = useDispatch()

    async function fetchGroups() {
        async function fetch(accessToken) {

            let response = await getGroups(accessToken)
            setGroups(_ => response.groups)
            setLoaded(_ => true)
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

    useEffect(() => {
        fetchGroups()
    },
        [])

    function redirectToCreate() {
        setCreate(_ => true)
    }

    if (create) {
        return <Navigate to='/groups/create' />
    }

    if (!loaded) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }

    return (
        <>
            <button onClick={redirectToCreate}>Создать</button>
            {groups.map(gr => <GroupView key={gr.id} groupId={gr.id} groupName={gr.name} />)}
        </>
    )
}


export default function Groups() {
    const authentication = useSelector(store => store.authenticationReducer)

    if (!authentication.isLoggedIn) {
        return <Navigate to='/login' />
    }

    if (authentication.role !== ROLES.TEACHER) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<PageRoot />} />
                <Route path='create' element={<CreateGroup />} />
                <Route path=':groupId/edit' element={<EditGroup />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}
