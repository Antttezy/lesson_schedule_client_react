import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { getAccessToken } from "../api/authentication";
import { listWorkloads } from "../api/workloads";
import Navbar from "../components/Navbar";
import { UpdateAccessToken } from "../redux/authentication/actions";
import { ROLES } from "../redux/authentication/constants";
import { CreateWorkload } from "./CreateWorkload";
import NotFound from "./NotFound";
import PagingBar from "../components/PagingBar";

function PageRoot() {
    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()
    const [workloads, setWorkloads] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [create, setCreate] = useState(false)

    async function fetchWorkloads() {
        async function fetch(accessToken) {
            setLoaded(l => false)
            let data = await listWorkloads(accessToken, page)
            console.log(data)
            setWorkloads(_ => data.workloads)
            setPage(_ => data.page)
            setPageCount(_ => data.maxPage)
            setLoaded(l => true)
        }

        try {

            await fetch(authentication.accessToken)

        } catch (err) {
            try {

                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await fetch(newToken)

            } catch (err) {

            }
        }
    }

    useEffect(() =>
        fetchWorkloads(),
        [page])

    function changePage(i) {
        setPage(_ => i)
    }

    function createClick(e) {
        setCreate(_ => true)
    }

    if (create) {
        return <Navigate to='/workloads/create' />
    }

    if (!loaded) {
        return <p>Загрузка...</p>
    }

    return (
        <>
            <div>
                <button onClick={createClick}>Создать</button>
            </div>
            <div>
                <ul>
                    {workloads.map(w =>
                        <li key={w.id}>
                            <p>{w.description} ({w.subject.name}) - {w.hours} часов</p>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <PagingBar pageCount={pageCount} pageChangedHandler={(i) => changePage(i)} />
            </div>
        </>
    )
}

export default function Workloads() {
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
                <Route path='create' element={<CreateWorkload />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}
