import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

function ImageCard({ image }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleAddToCart = () => {
        const isAlreadyInCart = cartItems.some((item) => item.id === image.id);
        if (isAlreadyInCart) {
            toast.warn('Item já está no carrinho!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } else {
            dispatch(addToCart(image));
            toast.success('Item adicionado ao carrinho!', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="image-card">
            <img src={image.url} alt={image.title} />
            <h4>{image.title}</h4>
            <p>R$ {image.price.toFixed(2)}</p>
            <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
        </div>
    );
}

export default ImageCard;