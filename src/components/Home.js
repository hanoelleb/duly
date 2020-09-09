import React from 'react';
import styles from '../notebook.module.css';

const Home = () => {
    return (
	<div className={styles.home}>
            <h2>Duly</h2>
	    <h3>Welcome!</h3>
	    <p>Duly is a place to store all your notes!</p>
        
	    <p>Whether just simple reminders for yourself or 
	    material for group study sessions, Duly can store it all.</p>

            <p>Create an account to save your notes!</p>

	    <p>Make your own notebooks now!</p>
	</div>
    )
}

export default Home;
