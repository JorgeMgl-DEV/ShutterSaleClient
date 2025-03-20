import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, increaseQuantity } from '../store/cartSlice';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleRemoveAll = () => {
        dispatch(removeFromCart(item.id));
    };

    const handleDecrease = () => {
        dispatch(decreaseQuantity(item.id));
    };

    const handleIncrease = () => {
        dispatch(increaseQuantity(item.id));
    };

    return (
        <div className="cart-item">
            <img src={item.url} alt={item.title} />
            <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>R$ {item.price.toFixed(2)} x {item.quantity}</p>
                <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                <div className="cart-item-controls">
                    <button onClick={handleIncrease}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleDecrease}>-</button>
                    <button onClick={handleRemoveAll}>Remover Todos</button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;