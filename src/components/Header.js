import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';
import { toast } from 'react-toastify';

function Header() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logout realizado com sucesso!', {
            position: 'top-right',
            autoClose: 3000,
        });
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Shutter Sale</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart">Carrinho</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile">Perfil</Link></li>
                            <li>
                                <span>Bem-vindo, {user?.name}</span>
                                <button onClick={handleLogout} className="logout-btn">
                                    Sair
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Cadastro</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;