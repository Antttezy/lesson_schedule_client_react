import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessToken } from "../api/authentication";
import { listStudents } from "../api/student";
import Navbar from "../components/Navbar";
import PagingBar from "../components/PagingBar";
import StudentList from "../components/StudentList";
import { UpdateAccessToken } from "../redux/authentication/actions";
import { ROLES } from "../redux/authentication/constants";

export default function Students() {
    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()
    const [students, setStudents] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    async function fetchStudents() {
        async function fetch(accessToken) {
            setLoaded(l => false)

            let data = await listStudents(accessToken, page)
            setStudents(s => data.students)
            setPage(p => data.page)
            setPageCount(p => data.maxPage)

            setLoaded(l => true)
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

    useEffect(() =>
        fetchStudents(),
        [page])

    function changePage(i) {
        setPage(p => i)
    }

    return (
        authentication.isLoggedIn ?
            authentication.role === ROLES.TEACHER ?
                <>
                    <Navbar />
                    <StudentList students={students} isLoaded={loaded} />
                    <PagingBar pageCount={pageCount} pageChangedHandler={(i) => changePage(i)} />
                </> :
                <Navigate to='/' /> :
            <Navigate to='/login' />
    )
}