import Sidebar from "./components/sidebar/Sidebar";
import ChatBody from "./components/chat-body/ChatBody";
import MessageInput from "./components/message-input/MessageInput";
import classes from "./ChatPage.module.css";

const ChatPage = ({socket}) => {

    return (
        <div className={classes.chat}>
            <Sidebar socket={socket}/>
            <main className={classes.main}>
                <ChatBody socket={socket}/>
                <MessageInput socket={socket}/>
            </main>
        </div>
    );
};

export default ChatPage;