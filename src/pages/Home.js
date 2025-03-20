import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import CategoryFilter from '../components/CategoryFilter';
import ImageCard from '../components/ImageCard';

// Dados fictícios para teste (substitua por chamadas ao back-end depois)
const mockImages = [
    { id: 1, title: 'Paisagem Urbana', url: 'https://via.placeholder.com/300x200', price: 29.90 },
    { id: 2, title: 'Natureza', url: 'https://via.placeholder.com/300x200', price: 19.90 },
    { id: 3, title: 'Retrato', url: 'https://via.placeholder.com/300x200', price: 39.90 },
];

const mockCategories = ['Paisagem', 'Natureza', 'Retratos', 'Eventos'];

function Home() {
    const [filteredImages, setFilteredImages] = useState(mockImages);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSearch = (query) => {
        const filtered = mockImages.filter((image) =>
            image.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredImages(filtered);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const filtered = mockImages.filter((image) =>
            image.title.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredImages(filtered);
    };

    return (
        <div className="home-page">
            <SearchBar onSearch={handleSearch} />
            <CategoryFilter
                categories={mockCategories}
                onCategorySelect={handleCategorySelect}
            />
            <section className="gallery">
                <h2>Galeria de Imagens</h2>
                <div className="image-grid">
                    {filteredImages.length > 0 ? (
                        filteredImages.map((image) => (
                            <ImageCard key={image.id} image={image} />
                        ))
                    ) : (
                        <p>Nenhuma imagem encontrada.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;