import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ImageCard({ image }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(image));
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