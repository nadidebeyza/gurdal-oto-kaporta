import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTools, FaImages, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { api } from '../services/api';

const accentColor = '#e63946';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: none; }
`;

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', 'Roboto', sans-serif;
`;

const PageTitle = styled.h1`
  color: ${accentColor};
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 0.5px;
`;

const PageDescription = styled.p`
  color: #444;
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const PanelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const PanelCard = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  border-radius: 18px;
  padding: 2rem;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
  animation: ${fadeIn} 1s ease;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;

  svg {
    font-size: 1.6rem;
    color: ${accentColor};
  }
`;

const PanelText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin: 1.5rem 0 0.6rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 0.95rem;
`;

const Select = styled.select`
  padding: 0.7rem;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 0.95rem;
`;

const TextArea = styled.textarea`
  padding: 0.7rem;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 0.95rem;
  min-height: 80px;
  grid-column: 1 / -1;
`;

const SubmitButton = styled.button`
  background: ${accentColor};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.9rem 1.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #a4161a;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  color: #fff;
  border-radius: 10px;
  padding: 0.9rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #fff;
    color: #f8f8f8;
  }
`;

const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const DomainInfoSection = styled.section`
  margin-top: 3rem;
  padding: 2.5rem;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(15, 15, 15, 0.92), rgba(15, 23, 42, 0.9));
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DomainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${accentColor};
  }

  span {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.95rem;
  }
`;

const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
`;

const DomainCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  strong {
    font-size: 1.05rem;
    color: #fff;
  }

  small {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const DomainMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);

  span {
    color: ${accentColor};
    font-weight: 600;
  }
`;

const DomainNote = styled.p`
  margin: 0;
  padding: 1.2rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ListItem = styled.li`
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #ffb4b4;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    color: #ff6b6b;
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #ffe08a;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    color: #ffdc5c;
  }
`;

const ListActions = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const StatusMessage = styled.div`
  margin-top: 1.5rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background: ${({ type }) =>
    type === 'error' ? 'rgba(255, 99, 132, 0.15)' : 'rgba(110, 231, 183, 0.15)'};
  color: ${({ type }) =>
    type === 'error' ? '#ff6b6b' : '#4ade80'};
  font-weight: 600;
`;

const PhotoListContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
`;

const SmallButton = styled.button`
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
`;

const RemovePhotoButton = styled(SmallButton)`
  background: #f87171;
  color: white;
  &:hover {
    background: #ef4444;
  }
`;

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 10px;
  margin-top: 0.5rem;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.2);
`;

const emptyCarForm = {
  title: '',
  year: '',
  km: '',
  details: '',
  price: '',
  color: '',
  fuelType: '',
  transmission: '',
  imageFiles: [] // Array of image files
};

const emptyGalleryForm = {
  title: '',
  description: '',
  category: 'Diğer',
  imageFile: null,
  imageUrl: ''
};

function Admin() {
  const [cars, setCars] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [carForm, setCarForm] = useState(emptyCarForm);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryForm);
  const [status, setStatus] = useState(null);
  const [carsLoading, setCarsLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryImagePreview, setGalleryImagePreview] = useState('');
  const [editingCarId, setEditingCarId] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  const resetCarForm = () => {
    setCarForm(emptyCarForm);
    setEditingCarId(null);
  };

  const removeImage = (index) => {
    setCarForm({
      ...carForm,
      imageFiles: carForm.imageFiles.filter((_, i) => i !== index)
    });
  };

  const resetGalleryForm = () => {
    setGalleryForm(emptyGalleryForm);
    setGalleryImagePreview('');
    setEditingGalleryId(null);
  };

  const loadCars = async () => {
    try {
      setCarsLoading(true);
      const { data } = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Araç listesi alınamadı.' });
    } finally {
      setCarsLoading(false);
    }
  };

  const loadGallery = async () => {
    try {
      setGalleryLoading(true);
      const { data } = await api.getGalleryImages();
      setGallery(data);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Galeri listesi alınamadı.' });
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
    loadGallery();
  }, []);

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const isEditing = Boolean(editingCarId);
    if (!isEditing && (!carForm.imageFiles || carForm.imageFiles.length === 0)) {
      setStatus({ type: 'error', message: 'Lütfen en az bir görsel seçin.' });
      return;
    }
    try {
      // Upload all images
      const uploadedUrls = [];
      for (const file of carForm.imageFiles) {
        const imageFormData = new FormData();
        imageFormData.append('image', file);
        const uploadResponse = await api.uploadImage(imageFormData);
        uploadedUrls.push(uploadResponse.data.url);
      }

      if (uploadedUrls.length === 0) {
        setStatus({ type: 'error', message: 'Görsel yüklenemedi.' });
        return;
      }

      const payload = {
        title: carForm.title,
        year: carForm.year,
        km: carForm.km,
        details: carForm.details,
        price: carForm.price,
        color: carForm.color,
        fuelType: carForm.fuelType,
        transmission: carForm.transmission,
        image: uploadedUrls[0], // First image as main
        photos: uploadedUrls // All images in photos array
      };

      if (isEditing) {
        await api.updateCar(editingCarId, payload);
        setStatus({ type: 'success', message: 'Araç başarıyla güncellendi.' });
      } else {
        await api.addCar(payload);
        setStatus({ type: 'success', message: 'Araç başarıyla eklendi.' });
      }

      resetCarForm();
      loadCars();
    } catch (error) {
      console.error('Car save error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Araç kaydedilirken hata oluştu.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const isEditing = Boolean(editingGalleryId);
    if (!isEditing && !galleryForm.imageFile && !galleryForm.imageUrl) {
      setStatus({ type: 'error', message: 'Lütfen galeri için bir görsel URL girin veya dosya seçin.' });
      return;
    }
    try {
      let uploadedImageUrl = galleryForm.imageUrl;

      if (galleryForm.imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', galleryForm.imageFile);
        const uploadResponse = await api.uploadImage(imageFormData);
        uploadedImageUrl = uploadResponse.data.url;
      }

      if (!uploadedImageUrl) {
        setStatus({ type: 'error', message: 'Görsel yüklenemedi.' });
        return;
      }

      const galleryImageData = {
        title: galleryForm.title,
        description: galleryForm.description,
        category: galleryForm.category,
        url: uploadedImageUrl
      };

      if (isEditing) {
        await api.updateGalleryImage(editingGalleryId, galleryImageData);
        setStatus({ type: 'success', message: 'Galeri görseli güncellendi.' });
      } else {
        await api.addGalleryImage(galleryImageData);
        setStatus({ type: 'success', message: 'Galeri görseli eklendi.' });
      }

      resetGalleryForm();
      loadGallery();
    } catch (error) {
      console.error('Gallery save error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Galeri kaydedilirken hata oluştu.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Bu aracı silmek istediğinize emin misiniz?')) return;
    setStatus(null);
    try {
      await api.deleteCar(id);
      setStatus({ type: 'success', message: 'Araç silindi.' });
      loadCars();
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Araç silinirken hata oluştu.' });
    }
  };

  const handleEditCar = (car) => {
    setCarForm({
      title: car.title || '',
      year: car.year || '',
      km: car.km || '',
      details: car.details || '',
      price: car.price || '',
      color: car.color || '',
      fuelType: car.fuelType || '',
      transmission: car.transmission || '',
      imageFiles: [] // Files will be empty when editing, user can add new ones
    });
    setEditingCarId(car._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditGallery = (image) => {
    setGalleryForm({
      title: image.title || '',
      description: image.description || '',
      category: image.category || 'Diğer',
      imageFile: null,
      imageUrl: image.url || ''
    });
    setGalleryImagePreview(image.url || '');
    setEditingGalleryId(image._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    setStatus(null);
    try {
      await api.deleteGalleryImage(id);
      setStatus({ type: 'success', message: 'Görsel silindi.' });
      loadGallery();
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Görsel silinirken hata oluştu.' });
    }
  };

  return (
    <AdminContainer>
      <PageTitle>Yönetim Paneli</PageTitle>
      <PageDescription>
        Satılık araçlar ve galeri içeriklerini buradan yönetebilirsiniz.
      </PageDescription>

      <PanelsGrid>
        <PanelCard>
          <PanelHeader>
            <FaTools />
            Satılık Araçlar
          </PanelHeader>
          <PanelText>
            Araç listesine yeni kayıt ekleyebilir veya mevcut kayıtları silebilirsiniz.
          </PanelText>

          <SectionTitle>{editingCarId ? 'Araç Düzenle' : 'Yeni Araç Ekle'}</SectionTitle>
          <Form onSubmit={handleCarSubmit}>
            <Input placeholder="Başlık" value={carForm.title} onChange={e => setCarForm({ ...carForm, title: e.target.value })} required />
            <Input placeholder="Yıl" value={carForm.year} onChange={e => setCarForm({ ...carForm, year: e.target.value })} />
            <Input placeholder="Kilometre" value={carForm.km} onChange={e => setCarForm({ ...carForm, km: e.target.value })} />
            <Input placeholder="Fiyat" value={carForm.price} onChange={e => setCarForm({ ...carForm, price: e.target.value })} />
            <Input placeholder="Renk" value={carForm.color} onChange={e => setCarForm({ ...carForm, color: e.target.value })} />
            <Input placeholder="Yakıt Tipi" value={carForm.fuelType} onChange={e => setCarForm({ ...carForm, fuelType: e.target.value })} />
            <Input placeholder="Vites" value={carForm.transmission} onChange={e => setCarForm({ ...carForm, transmission: e.target.value })} />
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setCarForm({ ...carForm, imageFiles: [...carForm.imageFiles, ...files] });
              }}
            />
            {carForm.imageFiles && carForm.imageFiles.length > 0 && (
              <PhotoListContainer>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem', marginTop: '1rem' }}>
                  {carForm.imageFiles.map((file, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <ImagePreview src={URL.createObjectURL(file)} alt={`Görsel ${index + 1}`} />
                      <RemovePhotoButton 
                        type="button" 
                        onClick={() => removeImage(index)}
                        style={{ position: 'absolute', top: '5px', right: '5px', padding: '0.2rem 0.4rem' }}
                      >
                        <FaTrash />
                      </RemovePhotoButton>
                    </div>
                  ))}
                </div>
              </PhotoListContainer>
            )}
            
            <TextArea placeholder="Detaylar" value={carForm.details} onChange={e => setCarForm({ ...carForm, details: e.target.value })} />
            <FormActions>
              <SubmitButton type="submit">
                {editingCarId ? (
                  <>
                    <FaEdit /> Aracı Güncelle
                  </>
                ) : (
                  <>
                    <FaPlus /> Aracı Ekle
                  </>
                )}
              </SubmitButton>
              {editingCarId && (
                <CancelButton type="button" onClick={resetCarForm}>
                  Vazgeç
                </CancelButton>
              )}
            </FormActions>
          </Form>

          <SectionTitle>Mevcut Araçlar</SectionTitle>
          <List>
            {carsLoading ? (
              <PanelText>Araçlar yükleniyor...</PanelText>
            ) : cars.length === 0 ? (
              <PanelText>Henüz araç bulunmuyor.</PanelText>
            ) : (
              cars.map(car => (
                <ListItem key={car._id}>
                  <div>
                    <strong>{car.title}</strong> — {car.year} • {car.price}
                  </div>
                  <ListActions>
                    <EditButton onClick={() => handleEditCar(car)}>
                      <FaEdit /> Düzenle
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteCar(car._id)}>
                      <FaTrash /> Sil
                    </DeleteButton>
                  </ListActions>
                </ListItem>
              ))
            )}
          </List>
        </PanelCard>

        <PanelCard>
          <PanelHeader>
            <FaImages />
            Galeri
          </PanelHeader>
          <PanelText>
            Galeriye yeni görseller ekleyebilir veya gereksiz görselleri kaldırabilirsiniz.
          </PanelText>

          <SectionTitle>{editingGalleryId ? 'Görsel Düzenle' : 'Yeni Görsel Ekle'}</SectionTitle>
          <Form onSubmit={handleGallerySubmit}>
            <Input placeholder="Başlık" value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} required />
            <Select value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}>
              <option value="Kaporta">Kaporta</option>
              <option value="Boyama">Boyama</option>
              <option value="Çekici">Çekici</option>
              <option value="Diğer">Diğer</option>
            </Select>
            <Input
              placeholder="Görsel URL (veya dosya seçin)"
              value={galleryForm.imageUrl}
              onChange={e => {
                setGalleryForm({ ...galleryForm, imageUrl: e.target.value, imageFile: null });
                setGalleryImagePreview(e.target.value || '');
              }}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setGalleryForm({ ...galleryForm, imageFile: file, imageUrl: '' });
                setGalleryImagePreview(file ? URL.createObjectURL(file) : '');
              }}
            />
            {galleryImagePreview && <ImagePreview src={galleryImagePreview} alt="Galeri görsel önizleme" />}
            <TextArea placeholder="Açıklama" value={galleryForm.description} onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })} />
            <FormActions>
              <SubmitButton type="submit">
                {editingGalleryId ? (
                  <>
                    <FaEdit /> Görseli Güncelle
                  </>
                ) : (
                  <>
                    <FaPlus /> Görsel Ekle
                  </>
                )}
              </SubmitButton>
              {editingGalleryId && (
                <CancelButton type="button" onClick={resetGalleryForm}>
                  Vazgeç
                </CancelButton>
              )}
            </FormActions>
          </Form>

          <SectionTitle>Mevcut Görseller</SectionTitle>
          <List>
            {galleryLoading ? (
              <PanelText>Galeri yükleniyor...</PanelText>
            ) : gallery.length === 0 ? (
              <PanelText>Henüz görsel bulunmuyor.</PanelText>
            ) : (
              gallery.map(image => (
                <ListItem key={image._id}>
                  <div>
                    <strong>{image.title}</strong> — {image.category}
                  </div>
                  <ListActions>
                    <EditButton onClick={() => handleEditGallery(image)}>
                      <FaEdit /> Düzenle
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteImage(image._id)}>
                      <FaTrash /> Sil
                    </DeleteButton>
                  </ListActions>
                </ListItem>
              ))
            )}
          </List>
        </PanelCard>
      </PanelsGrid>

      {status && <StatusMessage type={status.type}>{status.message}</StatusMessage>}

      {status && (
        <StatusMessage type={status.type}>{status.message}</StatusMessage>
      )}

      <DomainInfoSection>
        <DomainHeader>
          <div>
            <h3>Kayıtlı Domainler & Ödeme Takvimi</h3>
            <span>Son güncellenme: 21 Kasım 2025 — Kasım 2028'e kadar ödeme gerekmiyor</span>
          </div>
        </DomainHeader>

        <DomainGrid>
          <DomainCard>
            <strong>gürdalotokaporta.com</strong>
            <small>GoDaddy üzerinde kayıtlı</small>
            <DomainMeta>
              <div>Yenileme: Kasım 2028</div>
              <span>₺2.099,97</span>
            </DomainMeta>
          </DomainCard>

          <DomainCard>
            <strong>gurdalotokaporta.com</strong>
            <small>GoDaddy üzerinde kayıtlı</small>
            <DomainMeta>
              <div>Yenileme: Kasım 2028</div>
              <span>₺2.099,97</span>
            </DomainMeta>
          </DomainCard>

          <DomainCard>
            <strong>Tam Alan Adı Koruması ×2</strong>
            <small>GoDaddy planı</small>
            <DomainMeta>
              <div>Yenileme: Kasım 2028</div>
              <span>₺1.499,97 ×2</span>
            </DomainMeta>
          </DomainCard>
        </DomainGrid>

        <DomainNote>
          Yenilemeler GoDaddy.com üzerinden yapılır; işlemden önce{' '}
          <strong>Nadid Beyza Dokur</strong> ile koordine edin ve süreci{' '}
          <strong>en az 10 gün önce</strong> başlatın. Kasım 2028 sonrasında ihtiyaç halinde tam alan
          adı koruması devre dışı bırakılabilir ve iki domain tek alan adına indirilebilir; bu karar
          güvenlik gereksinimleri doğrultusunda değerlendirilmelidir.
        </DomainNote>
      </DomainInfoSection>
    </AdminContainer>
  );
}

export default Admin;

