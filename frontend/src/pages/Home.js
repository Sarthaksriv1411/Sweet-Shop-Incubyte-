import React, { useState, useEffect } from 'react';
import { getAllSweets, searchSweets } from '../services/sweetService';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
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

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchParams.name) params.name = searchParams.name;
      if (searchParams.category) params.category = searchParams.category;
      if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
      if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;

      const response = Object.keys(params).length > 0 
        ? await searchSweets(params)
        : await getAllSweets();
      
      setSweets(response.data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    fetchSweets();
  };

  if (loading && sweets.length === 0) {
    return <div className="loading">Loading sweets...</div>;
  }

  return (
    <div className="container">
      <div className="search-filter">
        <h2>Find Your Favorite Sweets</h2>
        <div className="search-filter-grid">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchParams.name}
            onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
          />
          
          <select
            value={searchParams.category}
            onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={searchParams.minPrice}
            onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={searchParams.maxPrice}
            onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
          <button onClick={handleReset} className="btn btn-secondary">
            Reset
          </button>
        </div>
      </div>

      {sweets.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'white', padding: '3rem' }}>
          <h2>No sweets found</h2>
          <p>Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="sweets-grid">
          {sweets.map(sweet => (
            <SweetCard 
              key={sweet._id} 
              sweet={sweet} 
              onUpdate={fetchSweets}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
