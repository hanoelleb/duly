import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import { login } from '../reducers/auth-reducer';
import { useDispatch } from 'react-redux';

const SignIn = (props) => {
     
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();

    function handleName(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
	e.preventDefault();
        var data = {
	    username: username,
            password: password
	};
        
	var url = 'http://localhost:5000/sign-in';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
	const response =
            fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
                .then(response => response.json())
                .then( res => {
		    localStorage.setItem('token', res.token);
		    dispatch(login(res.user, res.token));
                    console.log(localStorage.getItem('token'));
                    setRedirect(true);
                });
    }

    
    if (redirect !== true) {
    return (
	<div>
        <form onSubmit={handleSubmit}>
	    <h2>Sign in</h2>
	    <input type='text' placeholder='Username' name='username' 
	        value = {username} onChange={handleName} />
	    <input type='password' placeholder='Password' name='password' 
	        value = {password} onChange={handlePassword} />
	    <input type='submit' value='Sign in' />
	</form>
	<p>Not a registered user?
	    <Link to='/sign-up'>Sign up!</Link></p>
	</div>
      )
    }
    return <Redirect to='/notes' />
}

export default SignIn;
