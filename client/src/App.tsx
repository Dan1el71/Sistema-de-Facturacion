import './styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
          <Route path="*" element={<Navigate to="/" />} />
          {/*
            Cajero
          */}
          <Route element={<ProtectedRoute isAllowed={isAuth} requiredRole={2} />}>
            <Route index element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/facturacion" element={<FacturacionPage />} />
          </Route>
          {/*
            Administrador
          */}
          <Route element={<ProtectedRoute isAllowed={isAuth} requiredRole={1} />}>
            <Route path="/productos" element={<ProdutsPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/reportes" element={<ReportsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
