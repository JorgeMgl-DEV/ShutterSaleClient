import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ImageCard({ image, onClick }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(image));
    };

    return (
        <div className="image-card" onClick={onClick}>
            <img src={image.url} alt={image.title} />
            <h3>{image.title}</h3>
            <p>R$ {image.price.toFixed(2)}</p>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
                Adicionar ao Carrinho
            </button>
        </div>
    );
}

export default ImageCard;