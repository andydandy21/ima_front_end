import { useOutletContext } from "react-router-dom";

export default function Welcome() {
    
    const context = useOutletContext()
    console.log(context)
    return (
        <div className='main'>
            <div className='details'>
                <h1>Welcome to Instant Messenger App! {context.user.username}</h1>
            </div>
            <div className='messages'></div>
            <div className='members'></div>
        </div>
  );
}