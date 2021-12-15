import Message from "./Message";

export default function Messages() {
    return (
        <div className='messages'>
            <div className='messages-message-container'>
                <Message username='username' date='01/01/2020' text='this is the first message'/>
                <Message username='username' date='01/01/2020' text='this is the first message'/>
                <Message username='username' date='01/01/2020' text='this is the first message'/>
            </div>
            <div className="messages--form">
                <input placeholder="Type your message here..."/>
                <button>Submit</button>
            </div>
        </div>
    )
}