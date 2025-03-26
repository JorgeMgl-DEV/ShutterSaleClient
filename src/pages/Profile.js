import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageModal from '../components/ImageModal';

const mockPhotographerData = {
    profilePic: 'https://via.placeholder.com/150',
    description: 'Fotógrafo especializado em paisagens e esportes.',
    albums: [
        { id: 1, title: 'Paisagens', images: [{ id: 1, url: 'https://via.placeholder.com/300x200', title: 'Montanha' }] },
        { id: 2, title: 'Esportes', images: [{ id: 2, url: 'https://via.placeholder.com/300x200', title: 'Futebol' }] },
    ],
    reviews: [
        { id: 1, author: 'Maria', rating: 5, comment: 'Fotos incríveis!' },
        { id: 2, author: 'Pedro', rating: 4, comment: 'Ótimo trabalho.' },
    ],
};

function Profile() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        profilePic: user?.profilePic || mockPhotographerData.profilePic,
        description: user?.userType === 'Fotógrafo' ? mockPhotographerData.description : '',
        profilePicFile: null,
    });
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isAuthenticated) {
        toast.error('Você precisa estar logado para acessar o perfil.');
        navigate('/login');
        return null;
    }

    const isPhotographer = user?.userType === 'Fotógrafo';
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const userPurchases = purchaseHistory.filter((purchase) => purchase.userEmail === user.email);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 32 * 1024 * 1024) {
            toast.error('O arquivo deve ter no máximo 32 MB.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, profilePic: reader.result, profilePicFile: file }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map((u) =>
                u.email === user.email
                    ? { ...u, name: formData.name, ...(isPhotographer && { description: formData.description }), profilePic: formData.profilePic }
                    : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            toast.success('Perfil atualizado com sucesso!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Erro ao atualizar perfil.');
        }
    };

    return (
        <div className="profile-page">
            <section className="user-info">
                <img src={formData.profilePic} alt={formData.name || 'Usuário'} className="profile-pic" />
                <div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="edit-form">
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Foto de Perfil</label>
                                <div className="photo-options">
                                    <input
                                        type="url"
                                        name="profilePic"
                                        value={formData.profilePicFile ? '' : formData.profilePic}
                                        onChange={handleInputChange}
                                        placeholder="Digite a URL da imagem"
                                        disabled={!!formData.profilePicFile}
                                    />
                                    <span>ou</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={formData.profilePic && !formData.profilePicFile}
                                    />
                                </div>
                            </div>
                            {isPhotographer && (
                                <div className="form-group">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Digite uma breve descrição"
                                    />
                                </div>
                            )}
                            <div className="form-actions">
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1>{formData.name}</h1>
                            <p>E-mail: {user?.email}</p>
                            <p>Tipo: {user?.userType}</p>
                            {isPhotographer && <p>Descrição: {formData.description}</p>}
                            <button onClick={() => setIsEditing(true)} className="edit-btn">
                                Editar Perfil
                            </button>
                        </>
                    )}
                </div>
            </section>

            {isPhotographer && !isEditing && (
                <>
                    <section className="albums">
                        <h2>Portfólio</h2>
                        <div className="album-grid">
                            {mockPhotographerData.albums.length > 0 ? (
                                mockPhotographerData.albums.map((album) => (
                                    <div key={album.id} className="album-card">
                                        <h3>{album.title}</h3>
                                        <div className="album-images">
                                            {album.images.map((image) => (
                                                <img
                                                    key={image.id}
                                                    src={image.url}
                                                    alt={image.title}
                                                    onClick={() => setSelectedImage(image)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Ainda não há álbuns cadastrados.</p>
                            )}
                        </div>
                    </section>

                    <section className="reviews">
                        <h2>Avaliações</h2>
                        {mockPhotographerData.reviews.length > 0 ? (
                            <ul>
                                {mockPhotographerData.reviews.map((review) => (
                                    <li key={review.id}>
                                        <p><strong>{review.author}</strong> - {review.rating}/5</p>
                                        <p>{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Sem avaliações ainda.</p>
                        )}
                    </section>
                </>
            )}

            {!isPhotographer && !isEditing && (
                <>
                    <section className="buyer-info">
                        <h2>Bem-vindo, Comprador!</h2>
                        <p>Aqui você pode ver suas compras ou explorar mais imagens.</p>
                        <button onClick={() => navigate('/')}>Explorar Imagens</button>
                    </section>
                    <section className="purchase-history">
                        <h2>Histórico de Compras</h2>
                        {userPurchases.length > 0 ? (
                            <ul>
                                {userPurchases.map((purchase) => (
                                    <li key={purchase.id}>
                                        <p><strong>Data:</strong> {new Date(purchase.date).toLocaleString()}</p>
                                        <p><strong>Total:</strong> R$ {purchase.total.toFixed(2)}</p>
                                        <ul>
                                            {purchase.items.map((item) => (
                                                <li key={item.id}>{item.title} - R$ {item.price.toFixed(2)}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Você ainda não fez nenhuma compra.</p>
                        )}
                    </section>
                </>
            )}

            <ImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}

export default Profile;