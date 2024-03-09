import React, { useState } from "react";
import SelectOptions from "../components/SelectOptions.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import { filters } from "../config/content_index_filters.js";

// TODO: add missing meta-data inputs to form...

// Example data
const contentTypes = {
  app: "App",
  article: "Article/Blog Post",
  event: "Event",
  video: "Video",
};

// For multi-select, adjust as needed
const tagsOptions = {
  educational: "Educational",
  informative: "Informative",
  guide: "Guide",
  // Add more as needed
};

let languagesOption = { ...filters.agnostic.filters.language };
languagesOption.selection = [];

const ContentPostSubmission = () => {
  const [formData, setFormData] = useState({
    title: "",
    contentType: "",
    tags: [],
    languages: [],
    coverImage: null,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (e, key, filter) => {
    setFormData((prevState) => ({ ...prevState, [key]: filter.selection }));
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("type", formData.contentType);
    // formDataToSend.append("tags", formData.tags);
    formDataToSend.append("languages", formData.languages);
    // formDataToSend.append("app_platforms", formData.app_platforms);
    // formDataToSend.append("app_pricing_models", formData.app_pricing_models);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("coverImage", formData.coverImage);

    // console.log(formData);
    // console.log(formDataToSend);

    try {
      const response = await fetch("submit", {
        // const response = await fetch("http://127.0.0.1:8000/posts/create/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          Username: localStorage.getItem("username"),
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Content submitted:", result);
      navigate("/success-page");
    } catch (error) {
      console.error("There was an error submitting the form:", error.message);
    }
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
        <div className="w-max mx-auto">
          <Dropdown
            data={languagesOption}
            onChangeEvent={(e) => handleDropdownChange(e, "languages", languagesOption)}
          />
        </div>

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
