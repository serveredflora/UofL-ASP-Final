/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const path = require("path");
const fs = require("fs");

exports.seed = async function (knex) {
  await knex("contents").del();

  //const data = fs.readFileSync(path.join(__dirname, "..", "fake_content.json"));
  //contentData = JSON.parse(data);

  //return knex("contents").insert(contentData);

  return knex("contents").insert([
    // User 1's content
    {
      title: "User1 App",
      type: "app",
      languages: "english",
      image_path: "/pic/1.jpg",
      description: "An amazing app by user1",
      user_id: 1,
      approved: true,
      checked_by: 4,
      app_platforms: "android",
      app_pricing_model: "free",
      price: 3,
    },
    {
      title: "User1 Article",
      type: "article",
      languages: "spanish",
      image_path: "/pic/event2.jpg",
      description: "An insightful article by user1",
      user_id: 1,
      approved: false,
      article_reading_time: 3,
      article_publisher_type: "personal",
    },
    // User 2's content
    {
      title: "User2 Event",
      type: "event",
      languages: "mandarin",
      image_path: "/pic/home1.jpg",
      description: "An exciting event by user2",
      user_id: 2,
      approved: true,
      checked_by: 5,
      event_start_date :"2023-07-25",
      event_end_date : "2023-07-26",
      event_duration : 1,
      event_formats : "online",
      event_type : "volunteering",
      price : 2.99,
      event_participant_limit: 50,
    },
    {
      title: "User2 Video",
      type: "video",
      languages: "french",
      image_path: "/pic/tips0.jpg",
      description: "An educational video by user2",
      user_id: 2,
      approved: false,
      video_platforms: "youtube",
      video_types: "informational",
    },
    // User 3's content
    {
      title: "User3 App",
      type: "app",
      languages: "german",
      image_path: "/pic/1.jpg",
      description: "A groundbreaking app by user3",
      user_id: 3,
      approved: false,
      app_platforms: "ios",
      app_pricing_model: "free",
      price: 3,
    },
    {
      title: "User3 Article",
      type: "article",
      languages: "italian",
      image_path: "/pic/home4.jpg",
      description: "A deep dive article by user3",
      user_id: 3,
      approved: false,
      article_reading_time: 5,
      article_publisher_type: "media",
    },
    // Volunteer 1's content
    {
      title: "Volunteer1 Event",
      type: "event",
      languages: "english",
      image_path: "/pic/blog5.jpg",
      description: "A charitable event by volunteer1",
      user_id: 4,
      approved: true,
      checked_by: 4,
    },
    {
      title: "Volunteer1 Video",
      type: "video",
      languages: "spanish",
      image_path: "/pic/event1.jpg",
      description: "An inspiring video by volunteer1",
      user_id: 4,
      approved: true,
      checked_by: 5,
      video_platforms: "youtube",
      video_types: "informational",
    },
    // Volunteer 2's content
    {
      title: "Volunteer2 App",
      type: "app",
      languages: "mandarin",
      image_path: "/pic/blog3.jpg",
      description: "An innovative app by volunteer2",
      user_id: 5,
      approved: false,
      app_platforms: "web",
      app_pricing_model: "one_time_fee",
      price: 2,
    },
    {
      title: "Volunteer2 Article",
      type: "article",
      languages: "french",
      image_path: "/pic/2.jpg",
      description: "A thought-provoking article by volunteer2",
      user_id: 5,
      approved: false,
      article_reading_time: 3,
      article_publisher_type: "government",
    },
  ]);
};
