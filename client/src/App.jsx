import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Elements/signup'
import Login from './Elements/login'
import Dashboard from './Elements/dashboard'
import ForgotPassword from './Elements/forgotPassword'
import ResetPassword from './Elements/resetPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<Signup/>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/dashboard" element = {<Dashboard/>}></Route>
        <Route path = "/forgotPassword" element = {<ForgotPassword/>}></Route>
        <Route path = "/resetPassword/:token" element = {<ResetPassword/>}></Route>


      </Routes>
      
    </BrowserRouter>
  )
}

export default App
