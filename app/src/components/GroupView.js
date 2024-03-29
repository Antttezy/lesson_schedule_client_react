import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessToken } from "../api/authentication";
import { getGroupInfo } from "../api/groups";
import { UpdateAccessToken } from "../redux/authentication/actions";

export default function GroupView({ groupId, groupName }) {
    const authentication = useSelector(store => store.authenticationReducer)
    const [group, setGroup] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()

    async function fetchGroup() {
        async function fetch(accessToken) {
            let group = await getGroupInfo(accessToken, groupId)
            setGroup(_ => group)
            setLoaded(_ => true)
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

    function onAddClick(e) {
        e.preventDefault()
        setEdit(_ => true)
    }

    useEffect(() =>
        fetchGroup(),
        // eslint-disable-next-line
        [])

        if (edit) {
            return <Navigate to={`/groups/${groupId}/edit`} />
        }

    return (
        <div className='group-elem'>
            <div className='group-header'>
                <p>
                    {groupName}
                </p>
            </div>
            <div className='group-body'>
                {loaded ?
                    <>
                        <div>
                            <p>Студентов: {group.students.length}</p>
                        </div>
                        <div>
                            { group.workloads.length > 0 ?
                            <WorkloadList workloads={group.workloads} /> :
                            <p>Нет программ обучения</p>}
                            <button onClick={onAddClick}>Изменить список</button>
                        </div>
                    </> : <p>Loading...</p>}
            </div>
        </div>
    );
}


function WorkloadList({ workloads }) {
    console.log(workloads)

    return (
        <>
            <p>Программы обучения</p>
            <ul>
                {workloads.map(w => <li key={w.id}>{w.subject.name} - {w.hours} часов</li>)}
            </ul>
        </>
    )
}
