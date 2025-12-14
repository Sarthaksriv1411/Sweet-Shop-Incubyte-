import React, { useState, useEffect } from 'react';
import { getAllSweets, createSweet, updateSweet, deleteSweet, restockSweet } from '../services/sweetService';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-toastify';

const Admin = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'traditional',
    price: '',
    quantity: '',
    imageUrl: ''
  });

  const categories = ['traditional', 'chocolate', 'cookies', 'cakes', 'candies', 'other'];

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await getAllSweets();
      setSweets(response.data);
    } catch (error) {
      toast.error('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingSweet) {
        await updateSweet(editingSweet._id, formData);
        toast.success('Sweet updated successfully');
      } else {
        await createSweet(formData);
        toast.success('Sweet created successfully');
      }
      
      setShowModal(false);
      setEditingSweet(null);
      setFormData({
        name: '',
        description: '',
        category: 'traditional',
        price: '',
        quantity: '',
        imageUrl: ''
      });
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      description: sweet.description,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      imageUrl: sweet.imageUrl || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await deleteSweet(id);
        toast.success('Sweet deleted successfully');
        fetchSweets();
      } catch (error) {
        toast.error('Failed to delete sweet');
      }
    }
  };

  const handleRestock = async (sweet) => {
    const quantity = prompt('Enter quantity to add:', '10');
    if (quantity && !isNaN(quantity) && Number(quantity) > 0) {
      try {
        await restockSweet(sweet._id, Number(quantity));
        toast.success('Sweet restocked successfully');
        fetchSweets();
      } catch (error) {
        toast.error('Failed to restock sweet');
      }
    }
  };

  const openAddModal = () => {
    setEditingSweet(null);
    setFormData({
      name: '',
      description: '',
      category: 'traditional',
      price: '',
      quantity: '',
      imageUrl: ''
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="admin-header">
        <h2>Admin Panel - Manage Sweets</h2>
        <button onClick={openAddModal} className="btn btn-primary">
          Add New Sweet
        </button>
      </div>

      <div className="sweets-grid">
        {sweets.map(sweet => (
          <div key={sweet._id}>
            <SweetCard 
              sweet={sweet}
              showAdminActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <button 
              onClick={() => handleRestock(sweet)} 
              className="btn btn-success"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Restock
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSweet ? 'Edit Sweet' : 'Add New Sweet'}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Image URL (optional)</label>
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingSweet ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
