import React, { useState } from 'react';

const ContentReviewForm = () => {
  const [formData, setFormData] = useState({
    contentType: '',
    contentLink: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit formData to your API/server here
  };

  return (
    <form className="content-review-form" onSubmit={handleSubmit}>
      <label htmlFor="contentType">Content Type:</label>
      <select name="contentType" id="contentType" value={formData.contentType} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="app">App</option>
        <option value="article">Article/Blog Post</option>
        <option value="event">Event</option>
        <option value="video">Video</option>
      </select>

      <label htmlFor="contentLink">Content Link:</label>
      <input type="url" id="contentLink" name="contentLink" value={formData.contentLink} onChange={handleChange} placeholder="http://example.com" required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Brief description..." required></textarea>

      <button type="submit">Submit for Review</button>
    </form>
  );
};

export default ContentReviewForm;
