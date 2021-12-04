import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessToken } from "../api/authentication";
import { listStudents, setStudentGroup } from "../api/student";
import Navbar from "../components/Navbar";
import PagingBar from "../components/PagingBar";
import SetStudentGroup from "../components/SetStudentGroup";
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

    const [selectedStudent, setSelectedStudent] = useState(-1)
    const [selectGroup, setSelectGroup] = useState(false)

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

    function selectStudent(id) {
        setSelectedStudent(_ => id)
        setSelectGroup(_ => true)
    }

    async function confirmSetGroup(groupId, studentId) {
        try {
            await setStudentGroup(authentication.accessToken, groupId, studentId)

        } catch (err) {
            try {
                let newAccessToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newAccessToken))
                await setStudentGroup(newAccessToken, groupId, studentId)

            } catch (e) {

            }
        }

        await fetchStudents()
    }

    async function setStudentGroupHandler(args) {
        if (args.confirm) {
            await confirmSetGroup(args.selected, selectedStudent)
        }

        setSelectGroup(_ => false)
    }

    return (
        authentication.isLoggedIn ?
            authentication.role === ROLES.TEACHER ?
                <>
                    <Navbar />
                    {selectGroup ? <SetStudentGroup onGroupSelected={i => setStudentGroupHandler(i)} /> : null}
                    <StudentList students={students} isLoaded={loaded} selectStudentHandler={selectStudent}/>
                    <PagingBar pageCount={pageCount} pageChangedHandler={(i) => changePage(i)} />
                </> :
                <Navigate to='/' /> :
            <Navigate to='/login' />
    )
}
