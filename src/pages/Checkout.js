import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

function Checkout() {
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error('O carrinho está vazio!', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);

        // Simulação de pagamento (substituir por API PagSeguro no futuro)
        try {
            const purchase = {
                id: Date.now(), // ID único baseado no timestamp
                userEmail: user.email,
                items: cartItems,
                total,
                date: new Date().toISOString(),
            };

            // Carrega o histórico existente e adiciona a nova compra
            const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
            purchaseHistory.push(purchase);
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

            // Limpa o carrinho
            dispatch(clearCart());

            toast.success('Compra realizada com sucesso!', {
                position: 'top-right',
                autoClose: 3000,
            });
            navigate('/profile'); // Redireciona para o perfil
        } catch (error) {
            toast.error('Erro ao processar a compra.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <h1>Finalizar Compra</h1>
                <p>O carrinho está vazio. Adicione itens antes de prosseguir.</p>
                <button onClick={() => navigate('/')}>Voltar à Home</button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1>Finalizar Compra</h1>
            <div className="checkout-content">
                <section className="cart-summary">
                    <h2>Resumo do Pedido</h2>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <span>R$ {item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: R$ {total.toFixed(2)}</h3>
                </section>

                <section className="payment-form">
                    <h2>Informações de Pagamento</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processando...' : 'Confirmar Compra'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Checkout;