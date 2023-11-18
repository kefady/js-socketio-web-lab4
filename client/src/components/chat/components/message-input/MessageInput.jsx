import React, {useState} from 'react';
import classes from "./MessageInput.module.css";

const MessageInput = ({socket}) => {
    const [message, setMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('username')) {
            socket.emit('message', {
                id: `${socket.id}${Date.now()}${Math.random()}`,
                text: message,
                username: localStorage.getItem('username'),
                socketId: socket.id
            });
        }
        setMessage('');
    }

    return (
        <div className={classes.messageContainer}>
            <form className={classes.form} onSubmit={handleSend}>
                <input
                    className={classes.msgInput}
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder='Enter your message...'
                />
                <input className={classes.btn} type="submit" value="Send"/>
            </form>
        </div>
    );
};

export default MessageInput;