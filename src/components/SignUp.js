import React, {useState} from 'react';
import styles from '../notebook.module.css';

import {Link, Redirect} from 'react-router-dom';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [ready, setReady] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function handleName(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        var url = 'https://hanoelleb-notebook-api.herokuapp.com/sign-up';

        var data = { username: username, password: password };
	console.log('data: ' + data);

	fetch(url, {
	    method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
	    body: JSON.stringify(data) })
                .then(response => response.json())
                .then( data => {
                    setRedirect(true);
                });
    }

    function handleConfirmation(e) {
        setConfirmation(e.target.value);
    }

    if (!redirect)
    return (
	<div>
        <form className={styles.authform} onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <input type='text' placeholder='Username' name='username'
                value = {username} onChange={handleName} />
            <input type='password' placeholder='Password' name='password'
                value = {password} onChange={handlePassword} />
	    <input type='password' placeholder='Confirm Password' 
	        name='confirmation' onChange={handleConfirmation} />
	    { username !== '' && 
	      password !== '' && 
	      password === confirmation ?
                  <input type='submit' value='Sign up' /> 
		  :
		  <input type='submit' value='Sign up' disabled />
	    }
        </form>
	    <p className={styles.formlink}>Already have an account?
                <Link to='/sign-in'> Sign in!</Link>
            </p>
	</div>
    )
    return <Redirect to='/sign-in' />
}

export default SignUp;
