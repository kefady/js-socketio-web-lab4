import React, { useEffect, useState } from 'react';
import classes from './Sidebar.module.css';

const Sidebar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('chatUsers')) || [];
        setUsers(storedUsers);

        socket.on('responseUsers', (data) => {
            const updatedUsers = data;
            setUsers(updatedUsers);
            localStorage.setItem('chatUsers', JSON.stringify(updatedUsers));
        });

        return () => {
            socket.off('responseUsers');
        };
    }, [socket]);

    const filteredUserList = users.filter((value, index, self) =>
        index === self.findIndex((t) => t.user === value.user && t.socketId === value.socketId)
    );

    return (
        <div className={classes.sidebar}>
            <h2 className={classes.header}>Users</h2>
            <ul className={classes.users}>
                {filteredUserList.map((e) => (
                    <li key={e.id}>{e.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
