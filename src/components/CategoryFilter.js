import React from 'react';

function CategoryFilter({ categories, onCategorySelect }) {
    return (
        <div className="category-filter">
            <h3>Categorias</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <button onClick={() => onCategorySelect(category)}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryFilter;