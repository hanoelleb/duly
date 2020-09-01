import React from 'react';
import './App.css';
import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import Notes from './components/Notes.js';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

const Notenav = () => {
    return (
    <div className='nav'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/notes'>Notebooks</Link></li>
            <li><Link to='/sign-in'>Sign in</Link></li>
        </ul>
    </div>
    );
}


function App() {
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
	   </Switch>
	</Router>
    </div>
  );
}

export default App;
