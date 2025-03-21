import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Perfil</Link></li>
                    <li><Link to="/cart">Carrinho</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;