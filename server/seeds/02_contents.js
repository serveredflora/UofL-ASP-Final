/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("contents").del();

  return knex("contents").insert([
    // User 1's content
    {
      title: "User1 App",
      type: "app",
      language: "English",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An amazing app by user1",
      user_id: 1,
      approved: true,
      checked_by: 4,
    },
    {
      title: "User1 Article",
      type: "article",
      language: "Spanish",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An insightful article by user1",
      user_id: 1,
      approved: false,
    },
    // User 2's content
    {
      title: "User2 Event",
      type: "event",
      language: "Mandarin",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An exciting event by user2",
      user_id: 2,
      approved: true,
      checked_by: 5,
    },
    {
      title: "User2 Video",
      type: "video",
      language: "French",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An educational video by user2",
      user_id: 2,
      approved: false,
    },
    // User 3's content
    {
      title: "User3 App",
      type: "app",
      language: "German",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "A groundbreaking app by user3",
      user_id: 3,
      approved: false,
    },
    {
      title: "User3 Article",
      type: "article",
      language: "Italian",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "A deep dive article by user3",
      user_id: 3,
      approved: false,
    },
    // Volunteer 1's content
    {
      title: "Volunteer1 Event",
      type: "event",
      language: "English",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "A charitable event by volunteer1",
      user_id: 4,
      approved: true,
      checked_by: 4,
    },
    {
      title: "Volunteer1 Video",
      type: "video",
      language: "Spanish",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An inspiring video by volunteer1",
      user_id: 4,
      approved: true,
      checked_by: 5,
    },
    // Volunteer 2's content
    {
      title: "Volunteer2 App",
      type: "app",
      language: "Mandarin",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "An innovative app by volunteer2",
      user_id: 5,
      approved: false,
    },
    {
      title: "Volunteer2 Article",
      type: "article",
      language: "French",
      image_path: "https://placehold.co/300x150/DEEFEC/154752/svg",
      description: "A thought-provoking article by volunteer2",
      user_id: 5,
      approved: false,
    },
  ]);
};
