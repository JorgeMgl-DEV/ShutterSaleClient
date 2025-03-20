import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-page">
            <h1>Seu Carrinho</h1>
            {cartItems.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: R$ {total.toFixed(2)}</h3>
                        <div className="cart-actions">
                            <button onClick={handleClearCart}>Limpar Carrinho</button>
                            <button onClick={handleCheckout}>Finalizar Compra</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;