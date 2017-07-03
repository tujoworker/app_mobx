/**
 * This is the app starting point.
 * Here we inject the dom with react.
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//core packages
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';//load the app base
import './css/index.css';//some global DOM css

//make the magic
ReactDOM.render(<App />, document.getElementById('root'));
