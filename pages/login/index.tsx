import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import styles from './index.module.css';


const Login: React.FC = () => {
    const { data: session } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Implement login logic here
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login logic here
    };

    if (session) {
        if (session.user) {
          return (
            <div className="w-full">
              <Head>
                <title>Login</title>
              </Head>
              <div className="flex justify-between w-full px-4  mt-4">
                <p>Hi, {session.user.email}</p>
                <button
                  className="px-4 py-2 text-white bg-black rounded-xl"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
              <div className="text-center underline">
                <Link href="/weather-app">Weather App</Link>
              </div>
            </div>
          );
        }
      } else {

    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={() => signIn()}>Login with Google</button>
            </form>
        </div>
    );
    }
};

export default Login;
