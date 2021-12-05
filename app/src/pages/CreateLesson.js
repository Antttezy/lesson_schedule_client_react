import { useState } from "react"
import InputField from "../components/InputField"

export default function CreateLesson() {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    function onDateChange(dt) {
        setDate(_ => new Date(dt))
    }

    function onTimeChange(dt) {
        setTime(_ => new Date(dt))
    }

    function createClick(e) {
        e.preventDefault()

    }

    // TODO ввод группы и программы обучения, отправка запроса на создание урока

    return (
        <form>
            <InputField type='date' className='' changeHandler={(dt) => onDateChange(dt)} />
            <InputField type='time' className='' changeHandler={(dt) => onTimeChange(dt)} />
            <select>

            </select>
            <select>

            </select>
            <button type='submit' onClick={createClick}>Создать</button>
        </form>
    )
}