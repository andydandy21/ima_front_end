import Members from "./Members";
import Messages from "./Messages";

export default function Main(){  
    return (
        <div className='main'>
            <div className='details'>
                <h1>hello world</h1>
            </div>
            <Messages />
            <Members />
        </div>
  );
}