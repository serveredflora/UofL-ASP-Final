// client/src/components/ContentReviewForm.js

import React, { useState } from 'react';

function ContentReviewForm() {
  // Form handling logic goes here
  
  return (
    <form className="content-review-form">
      <label for="contentType">Content Type:</label>
      <select name="contentType" id="contentType">
        <option value="app">App</option>
        <option value="article">Article/Blog Post</option>
        <option value="event">Event</option>
      </select>

      <label for="contentLink">Content Link:</label>
      <input type="url" id="contentLink" name="contentLink" placeholder="http://example.com" required>

      <label for="description">Description:</label>
      <textarea id="description" name="description" placeholder="Brief description..." required></textarea>

      <button type="submit">Submit for Review</button>
    </form>
  );
}

export default ContentReviewForm;
