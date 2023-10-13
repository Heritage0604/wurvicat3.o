// pages/index.tsx
import { useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/sendEmail', formData);
    } catch (error) {
      alert(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="to">To:</label>
        <input
          type="email"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
}
