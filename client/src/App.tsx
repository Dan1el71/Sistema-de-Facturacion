import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import SideBar from './components/SideBar'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <SideBar/>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
