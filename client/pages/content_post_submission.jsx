import React, { useState } from "react";
import SelectOptions from "../components/select_options.jsx";
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

let languagesOption = { ...filters.agnostic.filters.language };
languagesOption.selection = [];

let appPlatformOptions = { ...filters.app.filters.app_platform };
appPlatformOptions.selection = [];

let appPricingModelOptions = { ...filters.app.filters.app_pricing_model };
appPricingModelOptions.allowMultipleSelections = false;
appPricingModelOptions.selection = "";

let articlePublisherTypeOptions = { ...filters.article.filters.article_publisher_type };
articlePublisherTypeOptions.allowMultipleSelections = false;
articlePublisherTypeOptions.selection = "";

let eventFormatOptions = { ...filters.event.filters.event_format };
eventFormatOptions.selection = [];

let eventTypeOptions = { ...filters.event.filters.event_type };
eventTypeOptions.allowMultipleSelections = false;
eventTypeOptions.selection = "";

let videoPlatformsOptions = { ...filters.video.filters.video_platform };
videoPlatformsOptions.selection = [];

let videoTypesOptions = { ...filters.video.filters.video_type };
videoTypesOptions.selection = [];

let videoPricingModelOptions = { ...filters.video.filters.video_type };
videoPricingModelOptions.selection = [];

const ContentPostSubmission = () => {
  const [formData, setFormData] = useState({
    title: "",
    contentType: "",
    // tags: [],
    languages: [],
    coverImage: null,
    description: "",
    price: 0.0,
    appPlatforms: [],
    appPricingModel: "",
    articlePublisherType: "",
    articleReadingTime: 0,
    eventFormats: "",
    eventType: "",
    eventStartDate: "",
    eventEndDate: "",
    eventParticipantLimit: 0,
    videoPlatforms: [],
    videoTypes: [],
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

    // TODO: somehow check that dropdowns are filled...

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("type", formData.contentType);
    // formDataToSend.append("tags", formData.tags);
    formDataToSend.append("languages", formData.languages);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("coverImage", formData.coverImage);

    switch (formData.contentType) {
      case "app": {
        formDataToSend.append("price", formData.price);
        formDataToSend.append("appPlatforms", formData.appPlatforms);
        formDataToSend.append("appPricingModel", formData.appPricingModel);
        break;
      }
      case "article": {
        formDataToSend.append("articlePublisherType", formData.articlePublisherType);
        formDataToSend.append("articleReadingTime", formData.articleReadingTime);
        break;
      }
      case "event": {
        formDataToSend.append("price", formData.price);
        formDataToSend.append("eventFormats", formData.eventFormats);
        formDataToSend.append("eventType", formData.eventType);
        formDataToSend.append("eventStartDate", formData.eventStartDate);
        formDataToSend.append("eventEndDate", formData.eventEndDate);
        formDataToSend.append("eventParticipantLimit", formData.eventParticipantLimit);
        break;
      }
      case "video": {
        formDataToSend.append("videoPlatforms", formData.videoPlatforms);
        formDataToSend.append("videoTypes", formData.videoTypes);
        break;
      }
    }

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

  const priceOptions = (key) => (
    <div key={key} className="flex flex-col space-y-2">
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" step="0.01" min="0" max="10000" value={formData.price} onChange={handleInputChange} required />
    </div>
  );

  let contentTypeSpecificOptions = [];
  switch (formData.contentType) {
    case "app": {
      contentTypeSpecificOptions.push(priceOptions(0));
      contentTypeSpecificOptions.push(
        <Dropdown key={1} data={appPlatformOptions} onChangeEvent={(e) => handleDropdownChange(e, "appPlatforms", appPlatformOptions)} />
      );
      contentTypeSpecificOptions.push(
        <Dropdown key={2} data={appPricingModelOptions} onChangeEvent={(e) => handleDropdownChange(e, "appPricingModel", appPricingModelOptions)} />
      );
      break;
    }
    case "article": {
      contentTypeSpecificOptions.push(
        <Dropdown
          key={0}
          data={articlePublisherTypeOptions}
          onChangeEvent={(e) => handleDropdownChange(e, "articlePublisherType", articlePublisherTypeOptions)}
        />
      );
      contentTypeSpecificOptions.push(
        <div key={1} className="flex flex-col space-y-2">
          <label htmlFor="articleReadingTime">Reading Time:</label>
          <input
            type="number"
            id="articleReadingTime"
            name="articleReadingTime"
            step="1"
            min="1"
            max="999"
            value={formData.articleReadingTime}
            onChange={handleInputChange}
            required
          />
        </div>
      );
      break;
    }
    case "event": {
      contentTypeSpecificOptions.push(priceOptions(0));
      contentTypeSpecificOptions.push(
        <Dropdown key={1} data={eventFormatOptions} onChangeEvent={(e) => handleDropdownChange(e, "eventFormats", eventFormatOptions)} />
      );
      contentTypeSpecificOptions.push(
        <Dropdown key={2} data={eventTypeOptions} onChangeEvent={(e) => handleDropdownChange(e, "eventType", eventTypeOptions)} />
      );
      contentTypeSpecificOptions.push(
        <div key={3} className="flex flex-col space-y-2">
          <label htmlFor="eventParticipantLimit">Participant Limit:</label>
          <input
            type="number"
            id="eventParticipantLimit"
            name="eventParticipantLimit"
            step="1"
            min="1"
            max="100000"
            value={formData.eventParticipantLimit}
            onChange={handleInputChange}
            required
          />
        </div>
      );
      contentTypeSpecificOptions.push(
        <div key={4} className="flex flex-col space-y-2">
          <label htmlFor="eventStartDate">Start Date:</label>
          <input
            type="date"
            id="eventStartDate"
            name="eventStartDate"
            min="2000-01-01"
            max="2099-12-31"
            value={formData.eventStartDate}
            onChange={handleInputChange}
            required
          />
        </div>
      );
      contentTypeSpecificOptions.push(
        <div key={5} className="flex flex-col space-y-2">
          <label htmlFor="eventEndDate">End Date:</label>
          <input
            type="date"
            id="eventEndDate"
            name="eventEndDate"
            min="2000-01-01"
            max="2099-12-31"
            value={formData.eventEndDate}
            onChange={handleInputChange}
            required
          />
        </div>
      );
      break;
    }
    case "video": {
      contentTypeSpecificOptions.push(
        <Dropdown key={0} data={videoPlatformsOptions} onChangeEvent={(e) => handleDropdownChange(e, "videoPlatforms", videoPlatformsOptions)} />
      );
      contentTypeSpecificOptions.push(
        <Dropdown key={1} data={videoTypesOptions} onChangeEvent={(e) => handleDropdownChange(e, "videoTypes", videoTypesOptions)} />
      );
      break;
    }
  }

  return (
    <div className="component-container-4">
      <h2>Create Content Post</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} placeholder="Title" onChange={handleInputChange} required />
        </div>

        {/* Content Type Select */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="contentType">Content Type:</label>
          <SelectOptions name="contentType" value={formData.contentType} onChange={handleInputChange} options={contentTypes} defaultOption="Select Type" />
        </div>

        {/* Cover Image Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="coverImage">Cover Image:</label>
          <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} accept="image/*" />
        </div>

        {/* Tags Select - Adjust this in the way you like */}
        {/* Language Select */}
        <Dropdown data={languagesOption} onChangeEvent={(e) => handleDropdownChange(e, "languages", languagesOption)} />

        {/* Description Textarea */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} placeholder="Description" onChange={handleInputChange} required />
        </div>

        {contentTypeSpecificOptions.map((element, i) => element)}

        <button className="mx-auto w-max button" type="submit">
          Publish Content
        </button>
      </form>
    </div>
  );
};

export default ContentPostSubmission;
