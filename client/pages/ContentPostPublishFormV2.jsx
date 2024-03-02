import React, { useState } from 'react';

const ContentPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    contentType: '',
    tags: [],
    language: '',
    coverImage: null,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, coverImage: e.target.files[0] }));
  };

  const handleTagChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData(prevState => ({ ...prevState, tags: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Process and submit formData to your API/server here
  };

  return (
    <form className="content-post-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />

      <label htmlFor="contentType">Content Type:</label>
      <select name="contentType" id="contentType" value={formData.contentType} onChange={handleInputChange} required>
        <option value="">Select Type</option>
        <option value="app">App</option>
        <option value="article">Article/Blog Post</option>
        <option value="event">Event</option>
        <option value="video">Video</option>
      </select>

      <label htmlFor="tags">Tags:</label>
      <select multiple name="tags" id="tags" value={formData.tags} onChange={handleTagChange} required>
        <option value="educational">Educational</option>
        <option value="informative">Informative</option>
        <option value="guide">Guide</option>
        {/* Add more tags as needed */}
      </select>

      <label htmlFor="language">Language:</label>
      <select name="language" id="language" value={formData.language} onChange={handleInputChange} required>
        <option value="">Select Language</option>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="mandarin">Mandarin</option>
        <option value="french">French</option>
        <option value="german">German</option>
        <option value="italian">Italian</option>
        {/* Add more languages as needed */}
      </select>

      <label htmlFor="coverImage">Cover Image:</label>
      <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} accept="image/*" />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>

      <button type="submit">Publish Content</button>
    </form>
  );
};

export default ContentPostForm;

