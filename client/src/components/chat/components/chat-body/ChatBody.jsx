import React, { useEffect, useState } from 'react';
import classes from './ChatBody.module.css';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ socket }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);

        socket.on('response', (msg) => {
            const updatedMessages = [...messages, msg];
            setMessages(updatedMessages);
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        });

        return () => {
            socket.off('response');
        };
    }, [socket, messages]);

    const handleLeave = () => {
        socket.emit('logout', { username: localStorage.getItem('username') });

        localStorage.removeItem('username');
        localStorage.removeItem('chatMessages');
        localStorage.removeItem('chatUsers');
        navigate('/');
    };

    return (
        <>
            <header className={classes.header}>
                <h1>LiveChat</h1>
                <button className={classes.btn} onClick={handleLeave}>
                    Leave chat
                </button>
            </header>
            <div className={classes.container}>
                {messages.map((msg) =>
                    msg.username === localStorage.getItem('username') ? (
                        <div className={classes.message} key={msg.id}>
                            <p className={classes.senderName}>You</p>
                            <div className={classes.msgTextSender}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.message} key={msg.id}>
                            <p>{msg.username}</p>
                            <div className={classes.msgTextRecipient}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default ChatBody;
