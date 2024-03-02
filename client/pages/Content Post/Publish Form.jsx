import React, { useState } from 'react';

function ContentPostForm() {
  // Form handling and submission logic
  
  return (
    <form className="content-post-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="contentType">Content Type:</label>
      <select name="contentType" id="contentType">
        <option value="app">App</option>
        <option value="article">Article/Blog Post</option>
        <option value="event">Event</option>
      </select>

      <label for="tags">Tags:</label>
      <select multiple name="tags" id="tags">
        <option value="educational">Educational</option>
        <option value="informative">Informative</option>
        <option value="guide">Guide</option>
        {/* Add more tags as needed */}
      </select>

      <label for="language">Language:</label>
      <select name="language" id="language">
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        {/* Add more languages as needed */}
      </select>

      <label for="coverImage">Cover Image:</label>
      <input type="file" id="coverImage" name="coverImage" accept="image/*">

      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea>

      <button type="submit">Publish Content</button>
    </form>
  );
}

export default ContentPostForm;
