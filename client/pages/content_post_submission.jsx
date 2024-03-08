import React, { useState } from "react";
import SelectOptions from "../components/SelectOptions.jsx";
import { Navigate } from 'react-router-dom';


// Example data
const contentTypes = {
  app: "App",
  article: "Article/Blog Post",
  event: "Event",
  video: "Video",
};

const languages = {
  english: "English",
  spanish: "Spanish",
  mandarin: "Mandarin",
  french: "French",
  german: "German",
  italian: "Italian",
};

// For multi-select, adjust as needed
const tagsOptions = {
  educational: "Educational",
  informative: "Informative",
  guide: "Guide",
  // Add more as needed
};

const ContentPostSubmission = () => {
  const [formData, setFormData] = useState({
    title: "",
    contentType: "",
    tags: [],
    language: "",
    coverImage: null,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, coverImage: e.target.files[0] }));
  };

  const handleTagChange = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData((prevState) => ({ ...prevState, tags: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Process and submit formData to your API/server here
  };

  return (
    <div className="flex flex-col space-y-4 adaptive-margin">
      <h2>Create Content Post</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Title Input */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleInputChange}
          required
        />

        {/* Content Type Select */}
        <label htmlFor="contentType">Content Type:</label>
        <SelectOptions
          name="contentType"
          value={formData.contentType}
          onChange={handleInputChange}
          options={contentTypes}
          defaultOption="Select Type"
        />

        {/* Tags Select - Adjust this in the way you like */}
        {/* Language Select */}
        <label htmlFor="language">Language:</label>
        <SelectOptions
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          options={languages}
          defaultOption="Select Language"
        />

        {/* Cover Image Input */}
        <label htmlFor="coverImage">Cover Image:</label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          onChange={handleFileChange}
          accept="image/*"
        />

        {/* Description Textarea */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleInputChange}
          required
        />

        <button className="mx-auto w-max button" type="submit">
          Publish Content
        </button>
      </form>
    </div>
  );
};

export default ContentPostSubmission;
