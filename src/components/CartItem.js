import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <div className="cart-item">
            <img src={item.url} alt={item.title} />
            <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>R$ {item.price.toFixed(2)}</p>
                <button onClick={handleRemove}>Remover</button>
            </div>
        </div>
    );
}

export default CartItem;