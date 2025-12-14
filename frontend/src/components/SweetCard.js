import React from 'react';
import { purchaseSweet } from '../services/sweetService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SweetCard = ({ sweet, onUpdate, showAdminActions = false, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      return;
    }

    try {
      await purchaseSweet(sweet._id, 1);
      toast.success('Purchase successful!');
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div className="sweet-card">
      <img 
        src={sweet.imageUrl} 
        alt={sweet.name}
        className="sweet-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Sweet';
        }}
      />
      
      <div className="sweet-content">
        <div className="sweet-header">
          <h3 className="sweet-name">{sweet.name}</h3>
          <span className="sweet-category">{sweet.category}</span>
        </div>
        
        <p className="sweet-description">{sweet.description}</p>
        
        <div className="sweet-footer">
          <div>
            <div className="sweet-price">₹{sweet.price}</div>
            <div className={`sweet-quantity ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
              {sweet.quantity > 0 ? `${sweet.quantity} available` : 'Out of stock'}
            </div>
          </div>
        </div>

        {showAdminActions ? (
          <div className="sweet-actions">
            <button onClick={() => onEdit(sweet)} className="btn btn-primary">
              Edit
            </button>
            <button onClick={() => onDelete(sweet._id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        ) : (
          <div className="sweet-actions">
            <button 
              onClick={handlePurchase} 
              className="btn btn-primary"
              disabled={sweet.quantity === 0}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
