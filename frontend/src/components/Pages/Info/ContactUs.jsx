import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
const [formData, setFormData] = useState({
name: '',
email: '',
message: '',
});

const [loading, setLoading] = useState(false);
const [responseMsg, setResponseMsg] = useState('');
const [error, setError] = useState('');

const handleChange = (e) => {
setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
setError('');
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setResponseMsg('');
setError('');

try {
  const res = await axios.post('/api/contactus', formData);
  setResponseMsg(res.data.message || 'Message sent successfully.');
  setFormData({ name: '', email: '', message: '' });
} catch (err) {
  setError(
    err.response?.data?.message || 'Something went wrong. Please try again.'
  );
} finally {
  setLoading(false);
}
};

return (
<div className="pt-20 pb-16 container-custom">
<h1 className="font-heading text-3xl font-semibold mb-6 text-secondary">Contact Us</h1>
<p className="mb-6 text-neutral-700">
We’re here to help. Fill out the form or reach out using the info below.
</p>

  {responseMsg && (
    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-sm">{responseMsg}</div>
  )}
  {error && (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-sm">{error}</div>
  )}

  <div className="grid md:grid-cols-2 gap-6">
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="input-field w-full"
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="input-field w-full"
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="input-field w-full"
        rows="5"
        placeholder="Your message"
        required
      />
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>

    <div>
      <h2 className="font-medium mb-2">Email:</h2>
      <p className="mb-4 text-neutral-600">support@luxora.com</p>
      <h2 className="font-medium mb-2">Phone:</h2>
      <p className="mb-4 text-neutral-600">+92 123 456 789</p>
      <h2 className="font-medium mb-2">Address:</h2>
      <p className="text-neutral-600">123 Boutique Lane, Lahore, Pakistan</p>
    </div>
  </div>
</div>
);
};

export default ContactUs;