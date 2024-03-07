const express = require("express");
const fs = require("fs");

// TODO: need to figure out how to share some code between client + server

const router = express.Router();

const MAX_PER_PAGE = 18;

let contentData;
let contentMaxPages;

exports.setupContentData = () => {
  const data = fs.readFileSync("./server/fake_content.json");
  contentData = JSON.parse(data);
  contentMaxPages = Math.ceil(contentData.length / MAX_PER_PAGE);
};

const clamp = (v, min, max) => {
  return Math.min(Math.max(v, min), max);
};

router.get("/data/content/page/:id/", (req, res) => {
  // TODO: need to apply filters on server-side else the current page might be entirely filtered

  let og_page = Number(req.params.id);
  let page = clamp(og_page, 1, contentMaxPages);

  if (og_page != page) {
    res.redirect(`/data/content/page/${page}/`);
    return;
  }

  res.json({
    currentPage: page,
    maxPages: contentMaxPages,
    data: contentData.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE),
  });
});

router.get("/data/content/:id/", (req, res) => {
  res.json(contentData[Number(req.params.id)]);
});

exports.router = router;
