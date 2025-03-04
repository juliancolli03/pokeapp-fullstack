import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import useRegisterForm from '../hooks/useRegisterForm'

const Register = () => {
  const axiosInstance = useAxios()
  const navigate = useNavigate()

  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useRegisterForm(() => {
    navigate('/login');
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-sm p-4">
          <h3 className="text-center mb-4">Registro</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => handleSubmit(e, axiosInstance)}>
            <div className="mb-3">
              <label className="form-label">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
