import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import CategoryFilter from '../components/CategoryFilter';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/ImageModal';

const mockImages = [
    { id: 1, title: 'Paisagem Urbana', url: 'https://via.placeholder.com/300x200', price: 29.90, category: 'Paisagem' },
    { id: 2, title: 'Natureza', url: 'https://via.placeholder.com/300x200', price: 19.90, category: 'Natureza' },
    { id: 3, title: 'Futebol - Gol', url: 'https://via.placeholder.com/300x200', price: 39.90, category: 'Futebol' },
    { id: 4, title: 'Basquete - Cesta', url: 'https://via.placeholder.com/300x200', price: 34.90, category: 'Basquete' },
    { id: 5, title: 'Natação - Piscina', url: 'https://via.placeholder.com/300x200', price: 25.90, category: 'Natação' },
];

const mockCategories = [
    { name: 'Paisagem', subcategories: [] },
    { name: 'Natureza', subcategories: [] },
    { name: 'Esportes', subcategories: ['Futebol', 'Basquete', 'Natação', 'Tênis'] },
];

function Home() {
    const [filteredImages, setFilteredImages] = useState(mockImages);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSearch = (query) => {
        const filtered = mockImages.filter((image) =>
            image.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredImages(filtered);
        setSelectedCategory(null);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === 'Esportes') {
            setFilteredImages(mockImages.filter((img) => img.category.startsWith('Futebol') || img.category.startsWith('Basquete') || img.category.startsWith('Natação')));
        } else {
            setFilteredImages(mockImages.filter((img) => img.category === category));
        }
    };

    return (
        <div className="home-page">
            <SearchBar onSearch={handleSearch} />
            <CategoryFilter
                categories={mockCategories}
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
            />
            <section className="gallery">
                <h2>Galeria de Imagens</h2>
                <div className="image-grid">
                    {filteredImages.length > 0 ? (
                        filteredImages.map((image) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))
                    ) : (
                        <p>Nenhuma imagem encontrada.</p>
                    )}
                </div>
            </section>

            <ImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}

export default Home;