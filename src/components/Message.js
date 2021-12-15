export default function Message(props) {
    return (
    <div className='messages--message'>
        <div></div>
        <h1>{props.username}</h1>
        <p>{props.date}</p>
        <h3>{props.text}</h3>
    </div>
    )
}