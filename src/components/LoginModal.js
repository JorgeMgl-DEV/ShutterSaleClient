import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Faça Login</h2>
                <p>Você precisa estar logado para realizar esta ação.</p>
                <button onClick={handleLoginRedirect}>Ir para Login</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}

export default LoginModal;