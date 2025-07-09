import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, LogOut, Settings, Edit, Save, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  useEffect(() => {
    // Give time for the store to hydrate
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Check authentication after loading
  if (!isAuthenticated || !user) {
    return (
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="font-heading text-3xl font-semibold text-secondary mb-4">
              Not Authorized
            </h1>
            <p className="text-neutral-600 mb-8">
              Please log in to access your profile.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-3xl font-semibold text-secondary mb-8">
              My Account
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-neutral-200">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-white mb-4">
                        <User size={30} />
                      </div>
                      <h2 className="font-medium text-secondary">{user.name}</h2>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className={`w-full flex items-center px-4 py-2 rounded-sm transition-colors ${
                            activeTab === 'profile' 
                              ? 'bg-primary text-white' 
                              : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <User size={18} className="mr-3" />
                          <span>Profile</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab('orders')}
                          className={`w-full flex items-center px-4 py-2 rounded-sm transition-colors ${
                            activeTab === 'orders' 
                              ? 'bg-primary text-white' 
                              : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <ShoppingBag size={18} className="mr-3" />
                          <span>Orders</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab('wishlist')}
                          className={`w-full flex items-center px-4 py-2 rounded-sm transition-colors ${
                            activeTab === 'wishlist' 
                              ? 'bg-primary text-white' 
                              : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <Heart size={18} className="mr-3" />
                          <span>Wishlist</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab('settings')}
                          className={`w-full flex items-center px-4 py-2 rounded-sm transition-colors ${
                            activeTab === 'settings' 
                              ? 'bg-primary text-white' 
                              : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <Settings size={18} className="mr-3" />
                          <span>Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 rounded-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <LogOut size={18} className="mr-3" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-sm shadow-sm">
                  {activeTab === 'profile' && <ProfileTab />}
                  {activeTab === 'orders' && <OrdersTab />}
                  {activeTab === 'wishlist' && <WishlistTab />}
                  {activeTab === 'settings' && <SettingsTab />}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'Pakistan',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update the user in the store
      updateUser(data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      country: user?.country || 'Pakistan',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };
  
  return (
    <div>
      <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
        <h2 className="font-heading text-xl font-medium text-secondary">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
          disabled={isLoading}
        >
          {isEditing ? (
            <>
              <Save size={18} className="mr-1" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit size={18} className="mr-1" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-error/10 text-error rounded-sm flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-success/10 text-success rounded-sm flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>{success}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              ) : (
                <p className="text-neutral-800">{formData.name || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field bg-neutral-100"
                  disabled
                />
              ) : (
                <p className="text-neutral-800">{formData.email}</p>
              )}
              {isEditing && (
                <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+92 xxx xxxxxxx"
                />
              ) : (
                <p className="text-neutral-800">{formData.phone || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Country
              </label>
              {isEditing ? (
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              ) : (
                <p className="text-neutral-800">{formData.country}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-neutral-800 mb-4">Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Street Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p className="text-neutral-800">{formData.address || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Lahore"
                  />
                ) : (
                  <p className="text-neutral-800">{formData.city || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  State / Province
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="NY"
                  />
                ) : (
                  <p className="text-neutral-800">{formData.state || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Zip / Postal Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="10001"
                  />
                ) : (
                  <p className="text-neutral-800">{formData.zipCode || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="mr-4 text-neutral-700 hover:text-neutral-900 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="p-6 border-b border-neutral-200">
        <h2 className="font-heading text-xl font-medium text-secondary">Order History</h2>
      </div>
      
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag size={40} className="mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No orders yet</h3>
            <p className="text-neutral-600 mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => window.location.href = '/products'}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                      {order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' 
                          ? 'bg-success/10 text-success' 
                          : order.status === 'processing'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-warning/10 text-warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {order.items?.length || 0}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                      Rs{order.total?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <button className="text-primary hover:text-primary-dark transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistTab = () => {
  return (
    <div>
      <div className="p-6 border-b border-neutral-200">
        <h2 className="font-heading text-xl font-medium text-secondary">My Wishlist</h2>
      </div>
      
      <div className="p-6 text-center">
        <Heart size={40} className="mx-auto text-neutral-400 mb-4" />
        <h3 className="text-lg font-medium text-neutral-800 mb-2">Your Wishlist</h3>
        <p className="text-neutral-600 mb-4">Visit your wishlist page to view all your saved items.</p>
        <button
          onClick={() => window.location.href = '/wishlist'}
          className="btn-primary"
        >
          Go to Wishlist
        </button>
      </div>
    </div>
  );
};

const SettingsTab = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to change password');
      }
      
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="p-6 border-b border-neutral-200">
        <h2 className="font-heading text-xl font-medium text-secondary">Account Settings</h2>
      </div>
      
      <div className="p-6">
        <h3 className="font-medium text-neutral-800 mb-4">Change Password</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-error/10 text-error rounded-sm flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-success/10 text-success rounded-sm flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>{success}</span>
          </div>
        )}
        
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>
        
        <hr className="my-8 border-neutral-200" />
        
        <h3 className="font-medium text-neutral-800 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-700">Email Notifications</h4>
              <p className="text-sm text-neutral-500">Receive emails about your orders and account activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-700">Marketing Emails</h4>
              <p className="text-sm text-neutral-500">Receive emails about new products, sales, and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};