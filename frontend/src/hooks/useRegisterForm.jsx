import { useState } from 'react';
import Swal from 'sweetalert2';

export default function useRegisterForm(onSuccess) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, axiosInstance) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres.'
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/register', {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        onSuccess();
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error en el registro.');
      } else {
        setError('Error de conexión con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    loading,
    handleSubmit,
  };
}
