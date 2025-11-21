import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const accentColor = '#e63946';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Poppins', 'Roboto', sans-serif;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem 2rem;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: #0b090a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  color: #f8f9fa;
`;

const Title = styled.h1`
  margin: 0 0 0.4rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${accentColor};
`;

const Subtitle = styled.p`
  margin: 0 0 2.2rem;
  color: #e9ecef;
  line-height: 1.6;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #f8f9fa;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 10, 0.55);
  color: #f8fafc;
  font-size: 0.95rem;
  transition: border 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${accentColor};
    background: rgba(0, 0, 0, 0.75);
  }
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.95rem;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(120deg, ${accentColor}, #b02a37);
  color: #fff;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 15px 30px rgba(230, 57, 70, 0.35);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background: ${({ type }) =>
    type === 'error'
      ? 'rgba(248, 113, 113, 0.18)'
      : 'rgba(74, 222, 128, 0.15)'};
  color: ${({ type }) => (type === 'error' ? '#ffb4b4' : '#c6f6d5')};
  font-weight: 600;
  text-align: center;
`;

const HelperText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: rgba(248, 249, 250, 0.65);
  text-align: center;
`;

const Accent = styled.span`
  color: ${accentColor};
  font-weight: 600;
`;

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await api.login(form);
      localStorage.setItem('token', data.token);
      setMessage({ type: 'success', text: 'Giriş başarılı. Yönlendiriliyorsunuz…' });
      setTimeout(() => navigate('/admin'), 700);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error.response?.data?.message ||
          'Giriş başarısız. Bilgilerinizi kontrol edin.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <Content>
        <AuthCard>
          <Title>Yönetim Paneli</Title>
          <Subtitle>
            Gürdal Oto ekibine özel erişim. Devam etmek için kayıtlı{' '}
            <Accent>kullanıcı bilgilerinizi</Accent> girin.
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="admin"
                value={form.username}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </SubmitButton>
          </Form>

          {message && (
            <Message type={message.type}>
              {message.text}
            </Message>
          )}

          <HelperText>
            Sorun yaşıyorsanız <Accent>+90 531 355 33 25</Accent> numaramızdan
            bize ulaşabilirsiniz.
          </HelperText>
        </AuthCard>
      </Content>
      <Footer />
    </PageWrapper>
  );
}

export default AdminLogin;

