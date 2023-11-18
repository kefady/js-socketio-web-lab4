import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import classes from "./HomePage.module.css";
import {wait} from "@testing-library/user-event/dist/utils";

const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

const HomePage = ({ socket }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [formValidation, setFormValidation] = useState(false);

    const handleUsernameChange = (e) => {
        const inputtedUsername = e.target.value;
        let errorMessage = '';

        if (inputtedUsername === '') {
            errorMessage = 'Username field cannot be empty.';
        } else if (!USERNAME_REGEX.test(inputtedUsername)) {
            errorMessage = 'Invalid username. Please, choose another one.';
        }

        setError(errorMessage);
        setFormValidation(errorMessage === '');
        setUsername(inputtedUsername);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValidation) {
            localStorage.setItem('username', username);

            socket.emit('login', {
                id: `${socket.id}${Date.now()}${Math.random()}`,
                username,
                socketId: socket.id
            });

            navigate('/chat');
        }
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Welcome to <span className={classes.logoText}>LiveChat</span></h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <input
                    className={classes.textInput}
                    type="text"
                    name="username"
                    id="username"
                    required={true}
                    placeholder='Enter your username'
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    className={classes.btnSubmit}
                    type="submit"
                    value="Join"
                    disabled={!formValidation}
                />
            </form>
            <p className={classes.error}>{error}</p>
        </div>
    );
};

export default HomePage;