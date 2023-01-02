import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom'

import Login from './components/Login/index';
import Register from './components/Register/index';
import Update from './components/Update/index';
import Home from './components/Home/index';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/Home' element= {<Home />} />
      <Route path='/Register' element= {<Register />} />
      <Route path='/Update/:id' element= {<Update />} />
    </Routes>
  </BrowserRouter>
)

export default App 