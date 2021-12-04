
export default function StudentList({ students, isLoaded, selectStudentHandler }) {
    if (!isLoaded) {
        return <p>Загрузка...</p>
    }

    if (students.length === 0) {
        return <p>В базе нет студентов</p>
    }

    return (
        <ul>
            {students.map(st =>
                <li key={st.id}>{st.secondName} {st.firstName} {st.groupName ?? 'Нет группы'} <button onClick={_ => selectStudentHandler(st.id)}>Сменить группу</button></li>
            )}
        </ul>
    )
}