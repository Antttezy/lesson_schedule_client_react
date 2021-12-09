import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../api/authentication";
import { getGroups } from "../api/groups";
import { UpdateAccessToken } from "../redux/authentication/actions";

export default function SetStudentGroup({ onGroupSelected }) {
    const authorization = useSelector(store => store.authenticationReducer)
    const [groups, setGroups] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState(null)
    const dispatch = useDispatch()

    async function fetchGroups() {
        async function fetch(accessToken) {

            let response = await getGroups(accessToken)
            setGroups(_ => response.groups)
            setLoaded(_ => true)
        }

        try {
            await fetch(authorization.accessToken)

        } catch (error) {
            try {
                const newToken = await getAccessToken(authorization.refreshToken)
                dispatch(UpdateAccessToken(newToken))
                await fetch(newToken)

            } catch (error) {

            }
        }
    }

    useEffect(() => {
        fetchGroups()
    },
        // eslint-disable-next-line
        [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    function onGroupSelect(e) {
        setSelected(s => e.target.value)
    }

    function buildConfirm(isSuccess) {

        if (!isSuccess) {
            onGroupSelected({
                confirm: false
            })
            return;
        }

        if (selected == null || selected === -1) {
            return;
        }

        if (isSuccess) {
            onGroupSelected({
                confirm: true,
                selected: selected !== 0 ? selected : null
            })
        }
    }

    return (
        <>
            <select onChange={onGroupSelect}>
                <option value='-1'>не выбрано</option>
                <option value='0'>без группы</option>
                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <button onClick={() => buildConfirm(true)}>Подтвердить</button>
            <button onClick={() => buildConfirm(false)}>Отмена</button>
        </>
    )
}
