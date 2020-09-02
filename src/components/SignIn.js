import React, {useState} from 'react';
import {Link} from 'react-router-dom';
const SignIn = (props) => {
     
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleName(e) {
        setUsername(e.target.value);
	console.log(username);
    }

    function handlePassword(e) {
	console.log(e.target.value);
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
                    console.log(localStorage.getItem('token'));
                });
    }

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

export default SignIn;
