const express = require("express");
const fs = require("fs");
const knex = require("./db.js");

// TODO: need to figure out how to share some code between client + server

const router = express.Router();

const MAX_PER_PAGE = 18;

let contentData;
let contentMaxPages;

// exports.setupContentData = () => {
//   const data = fs.readFileSync("./server/fake_content.json");
//   contentData = JSON.parse(data);
//   contentMaxPages = Math.ceil(contentData.length / MAX_PER_PAGE);
// };

const clamp = (v, min, max) => {
  return Math.min(Math.max(v, min), max);
};

// Route to fetch all contents
// router.get("/data/contents/all", async (req, res) => {
//   try {
//     const data = await knex("contents").select("*");
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching all content data", error);
//     res.status(500).json({ message: "Error fetching all content data from the database" });
//   }
// });

// module.exports = router;

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


// router.get("/data/contents/page/:id/", (req, res) => {
//   // TODO: need to apply filters on server-side else the current page might be entirely filtered

//   let og_page = Number(req.params.id);
//   let page = clamp(og_page, 1, contentMaxPages);

//   if (og_page != page) {
//     res.redirect(`/data/contents/page/${page}/`);
//     return;
//   }

//   res.json({
//     currentPage: page,
//     maxPages: contentMaxPages,
//     data: contentData.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE),
//   });
// });

// router.get("/data/contents/:id/", (req, res) => {
//   res.json(contentData[Number(req.params.id)]);
// });

// exports.router = router;
