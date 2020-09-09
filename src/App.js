import React, {useState} from 'react';
import styles from './notebook.module.css';
import './App.css';

import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import Notes from './components/Notes.js';
import SignUp from './components/SignUp.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

import {logout} from './reducers/auth-reducer';

const Notenav = (props) => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
    <div className={styles.navbar}>
        <ul>
	    <li className={styles.logo}>Duly</li>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/notes'>Notebooks</Link></li>
	    { user ?
                <li onClick={()=> dispatch(logout())}>Sign out</li> :
                <li>
		    <Link to='/sign-in'>Sign in</Link>
		</li>
	    }
        </ul>
    </div>
    );
}


function App() {
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  return (
    <div>
	<Router>
	   <Notenav />
	   <Switch>
	       <Route exact path='/'>
	           <Home />
	       </Route>

	       <Route path='/notes'>
                   <Notes />
               </Route>

	       <Route path='/sign-in'>
                   <SignIn />
               </Route>

	       <Route path='/sign-up'>
	           <SignUp />
	       </Route>
	   </Switch>
	</Router>
    </div>
  );
}

export default App;
