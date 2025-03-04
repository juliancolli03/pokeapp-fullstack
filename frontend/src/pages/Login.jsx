import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../context/AuthContext'
import useLoginForm from '../hooks/useLoginForm'

const Login = () => {
  const axiosInstance = useAxios()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit
  } = useLoginForm((token) => {
    login(token)
    navigate('/')
  })

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-sm p-4">
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => handleSubmit(e, axiosInstance)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
