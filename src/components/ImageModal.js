import React from 'react';

function ImageModal({ image, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    X
                </button>
                <img src={image.url} alt={image.title} className="modal-image" />
                <h3>{image.title}</h3>
                {image.price && <p>R$ {image.price.toFixed(2)}</p>}
            </div>
        </div>
    );
}

export default ImageModal;