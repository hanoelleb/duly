import React from 'react';
import './App.css';

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
	           <h1>Duly</h1>
	       </Route>

	       <Route path='/notes'>
                   <h1>Notebooks</h1>
               </Route>

	       <Route path='/sign-in'>
                   <h1>Sign in</h1>
               </Route>
	   </Switch>
	</Router>
    </div>
  );
}

export default App;
