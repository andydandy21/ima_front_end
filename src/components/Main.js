import { useOutletContext } from "react-router-dom"

import Members from "./Members";
import Messages from "./Messages";


export default function Main(){  

    const context = useOutletContext()
    console.log(context)
    return (
        <div className='main'>
            <div className='details'>
                <h1>hello world {context.user.username}</h1>
            </div>
            <Messages />
            <Members />
        </div>
  );
}