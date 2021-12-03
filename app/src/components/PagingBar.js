export default function PagingBar({ pageCount, pageChangedHandler }) {

    function press(e, i) {
        e.preventDefault()
        pageChangedHandler(i)
    }

    const arr = Array.apply(null, Array(pageCount))

    return (
        arr.map((a, i) => {
            return <button key={i} onClick={(e) => press(e, i + 1)}>{i + 1}</button>
        })
    );
}