import React, { useState } from 'react';

const ContentReviewForm = () => {
  const [formData, setFormData] = useState({
    contentType: '',
    contentLink: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  // Regular expression pattern for URL validation
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    // Clear errors
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contentType) {
      newErrors.contentType = 'Content type is required';
    }

    if (!formData.contentLink || !urlPattern.test(formData.contentLink)) {
      newErrors.contentLink = 'Please enter a valid URL';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      // Submit formData to your API/server here
    }
  };

  return (
    <form className="content-review-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contentType">Content Type:</label>
        <select name="contentType" id="contentType" value={formData.contentType} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="app">App</option>
          <option value="article">Article/Blog Post</option>
          <option value="event">Event</option>
          <option value="video">Video</option>
        </select>
        {errors.contentType && <p className="error">{errors.contentType}</p>}
      </div>

      <div>
        <label htmlFor="contentLink">Content Link:</label>
        <input type="url" id="contentLink" name="contentLink" value={formData.contentLink} onChange={handleChange} placeholder="http://example.com" required />
        {errors.contentLink && <p className="error">{errors.contentLink}</p>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Brief description..." required></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <button type="submit">Submit for Review</button>
    </form>
  );
};

export default ContentReviewForm;
