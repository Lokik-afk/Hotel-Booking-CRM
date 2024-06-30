import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Homescreen />} />
          <Route path='/bookingscreen/:roomid' element={<Bookingscreen />} />
          <Route path ='/register' element={<Registerscreen/>} />
          <Route path ='/login' element={<Loginscreen/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
