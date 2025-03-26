import React from 'react';

function CategoryFilter({ categories, onCategorySelect, selectedCategory }) {
    return (
        <div className="category-filter">
            <h3>Categorias</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.name}>
                        <button
                            className={selectedCategory === category.name ? 'active' : ''}
                            onClick={() => onCategorySelect(category.name)}
                        >
                            {category.name}
                        </button>
                        {category.name === 'Esportes' && selectedCategory === 'Esportes' && (
                            <ul className="subcategories">
                                {category.subcategories.map((sub) => (
                                    <li key={sub}>
                                        <button
                                            className={selectedCategory === sub ? 'active' : ''}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita selecionar a categoria pai
                                                onCategorySelect(sub);
                                            }}
                                        >
                                            {sub}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryFilter;