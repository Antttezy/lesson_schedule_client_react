import './button.css'

export default function Button({ clickHandler, caption, enabled = true }) {

    function click(e) {
        e.preventDefault();
        clickHandler();
    }

    if (enabled)
        return <button className='btn' onClick={(e) => click(e)}>{caption}</button>
    else
        return <button className='btn btn-disabled' onClick={e => e.preventDefault()}>{caption}</button>
}