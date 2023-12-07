import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'

import LoginPage from './pages/LoginPage'
import ClientsPage from './pages/ClientsPage'
import ProdutsPage from './pages/ProdutsPage'
import UsersPage from './pages/UsersPage'
import FacturacionPage from './pages/FacturacionPage'
import ReportsPage from './pages/ReportsPage'
import HomePage from './pages/HomePage'

function App() {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="*" element={<h1>404</h1>} />
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="" element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/productos" element={<ProdutsPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/facturacion" element={<FacturacionPage />} />
            <Route path="/reportes" element={<ReportsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
