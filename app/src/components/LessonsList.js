export default function LessonsList({ lessons, loaded }) {
    console.log(lessons)

    return (
        loaded ?
            lessons.length > 0 ?
                <ul>
                    {lessons.map(lesson =>
                        <ul key={lesson.id}>
                            {new Date(`${lesson.lessonTime.replace('T', ' ')} UTC`).toLocaleString()} {lesson.workload.subject.name}, {lesson.teacher.secondName} {lesson.teacher.firstName[0]}
                        </ul>)}
                </ul> :
                <span>В выбранные дни нет уроков</span>
            : <></>
    )
}
