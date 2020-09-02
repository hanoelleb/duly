import React, {useState} from 'react';
import './App.css';
import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import Notes from './components/Notes.js';
import SignUp from './components/SignUp.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


const Notenav = (props) => {
    return (
    <div className='nav'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/notes'>Notebooks</Link></li>
	    { props.user != null ? 
               <li>Sign out</li> :
               <li><Link to='/sign-in'>Sign in</Link></li>
	    }
        </ul>
    </div>
    );
}


function App() {
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  return (
    <div className="App">
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
