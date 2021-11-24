import { useState } from "react"
import './input.css'

export default function InputField({placeholder, type, changeHandler, className}) {
    const [value, setValue] = useState('')

    function change(e) {
        e.preventDefault();
        setValue(v => e.target.value);
        changeHandler(value);
    }

    return <input className={`${className} field`} type={type} placeholder={placeholder} value={value} onChange={(e) => change(e)}/>
}
