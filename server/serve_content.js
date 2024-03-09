const express = require("express");
const fs = require("fs");
const knex = require("./db.js");

const router = express.Router();

const MAX_PER_PAGE = 18;

let contentData;
let contentMaxPages;

const clamp = (v, min, max) => {
  return Math.min(Math.max(v, min), max);
};

router.get("/data/contents/page/:id/", async (req, res) => {
  try {
    const totalContentCount = await knex("contents").count("* as count").first();
    const contentMaxPages = Math.ceil(totalContentCount.count / MAX_PER_PAGE);

    let og_page = Number(req.params.id);
    let page = clamp(og_page, 1, contentMaxPages);

    if (og_page !== page) {
      res.redirect(`/data/contents/page/${page}/`);
      return;
    }

    const data = await knex("contents")
      .select("*")
      .offset((page - 1) * MAX_PER_PAGE)
      .limit(MAX_PER_PAGE);

    res.json({
      currentPage: page,
      maxPages: contentMaxPages,
      data,
    });
  } catch (error) {
    console.error("Error fetching content data", error);
    res.status(500).json({ message: "Error fetching content data from the database" });
  }
});

router.get("/data/contents/:id/", async (req, res) => {
  try {
    const contentId = Number(req.params.id);
    const content = await knex("contents").where("id", contentId).first();

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching specific content", error);
    res.status(500).json({ message: "Error fetching content from the database" });
  }
});

module.exports = router;
