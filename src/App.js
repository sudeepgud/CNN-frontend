import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Predict from './Components/Predict';

export default function App() {
  let hours = 1;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem('setupTime');
  if(setupTime == null) {
    localStorage.setItem('setupTime', now)
  }else {
    if(now-setupTime > hours*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}
  return (
    <Router>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/predict' element={<Predict/>}/>
        </Route>
      </Routes>
    </Router>
  );
}