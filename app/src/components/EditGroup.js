import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router"
import { getAccessToken } from "../api/authentication";
import { addWorkloadToGroup, getGroupInfo, removeWorkloadFromGroup } from "../api/groups";
import { listWorkloads } from "../api/workloads";
import { UpdateAccessToken } from "../redux/authentication/actions";
import PagingBar from "./PagingBar";

export default function EditGroup() {
    const { groupId } = useParams()

    const [groupInfo, setGroupInfo] = useState({})
    const [infoLoaded, setInfoLoaded] = useState(false)

    const authentication = useSelector(store => store.authenticationReducer)
    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)

    const [workloads, setWorkloads] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [completed, setCompleted] = useState(false)

    async function fetchWorkloads() {
        async function fetch(accessToken) {
            setLoaded(l => false)
            let data = await listWorkloads(accessToken, page)
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

    async function fetchGroupInfo() {
        async function fetch(accessToken) {
            setInfoLoaded(l => false)
            const response = await getGroupInfo(accessToken, groupId)
            setGroupInfo(_ => response)
            setInfoLoaded(l => true)
        }

        try {
            await fetch(authentication.accessToken)
        } catch (e) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await fetch(newToken)
            } catch (err) {

            }
        }
    }

    useEffect(() =>
        fetchGroupInfo(),
        // eslint-disable-next-line
        [])

    useEffect(() =>
        fetchWorkloads(),
        // eslint-disable-next-line
        [page])

    function changePage(i) {
        setPage(_ => i)
    }

    async function addWorkload(id, accessToken) {
        return await addWorkloadToGroup(accessToken, {
            workloadId: id,
            groupId
        })
    }

    async function removeWorkload(id, accessToken) {
        return await removeWorkloadFromGroup(accessToken, {
            workloadId: id,
            groupId
        })
    }

    async function changeWorkload(e, i) {
        e.preventDefault()
        const add = e.target.checked

        try {
            await add ? addWorkload(i, authentication.accessToken) : removeWorkload(i, authentication.accessToken)

        } catch (e) {
            try {
                const newToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await add ? addWorkload(i, authentication.accessToken) : removeWorkload(i, authentication.accessToken)

            } catch (e) {

            }
        }

        setCompleted(_ => true)
    }


    if (completed) {
        return <Navigate to='/groups' />
    }

    if (!loaded || !infoLoaded) {
        return <p>Загрузка...</p>
    }

    return (
        <div>
            <div>
                {workloads.map(w => {
                    const active = groupInfo.workloads.some(w_sel => w.id === w_sel.id)

                    return (
                        <div key={w.id}>
                            <span>{w.description} ({w.subject.name})</span>
                            <input type='checkbox' checked={active} onChange={(e) => changeWorkload(e, w.id)} />
                        </div>)
                })
                }
            </div>
            <div>
                <PagingBar pageCount={pageCount} pageChangedHandler={(i => changePage(i))} />
            </div>
        </div>
    );
}
