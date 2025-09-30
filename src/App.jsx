import './App.css'
import {Routes, Route} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import AddDepartment from './Pages/Department'
import ListDepartments from './Pages/ListDept'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Department" element={<AddDepartment/>} />
      <Route path="/ListDept" element={<ListDepartments/>} />
    </Routes>
    
    </>
  )
}

export default App
