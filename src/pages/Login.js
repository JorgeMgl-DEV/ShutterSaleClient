import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';
import { toast } from 'react-toastify';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Carrega os usuários do localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Busca o usuário correspondente
            const user = users.find(
                (u) => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                dispatch(login({ name: user.name, email: user.email }));
                toast.success('Login realizado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                navigate('/');
            } else {
                throw new Error('E-mail ou senha inválidos');
            }
        } catch (error) {
            toast.error(error.message || 'Erro ao fazer login.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Digite seu e-mail"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Digite sua senha"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <p>
                Não tem uma conta? <a href="/register">Cadastre-se</a>
            </p>
        </div>
    );
}

export default Login;