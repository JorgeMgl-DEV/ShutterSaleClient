import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
    const cartItems = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert('O carrinho está vazio!');
            return;
        }

        setLoading(true);
        try {
            // Enviar os dados para o back-end
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/payment/create`,
                {
                    items: cartItems,
                    total,
                    customer: formData,
                }
            );

            // Assumindo que o back-end retorna uma URL de redirecionamento do PagSeguro
            const { paymentUrl } = response.data;
            window.location.href = paymentUrl; // Redireciona para o PagSeguro
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            alert('Erro ao processar o pagamento. Tente novamente.');
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
                            {loading ? 'Processando...' : 'Pagar com PagSeguro'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Checkout;