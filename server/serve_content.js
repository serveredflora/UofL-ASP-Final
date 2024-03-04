const express = require("express");
const fs = require("fs");

// TODO: need to figure out how to share some code between client + server

const router = express.Router();

let contentData;

exports.setupContentData = () => {
  const data = fs.readFileSync("./server/fake_content.json");
  contentData = JSON.parse(data);
};

router.get("/data/content/page/:id/", (req, res) => {
  // TODO: need to apply filters on server-side else the current page might be entirely filtered
  const MAX_PER_PAGE = 18;

  let og_page = Number(req.params.id);
  let page = Math.max(Math.min(og_page, Math.ceil(contentData.length / MAX_PER_PAGE)), 1);

  if (og_page != page) {
    res.redirect(`/data/content/page/${page}/`);
    return;
  }

  res.json(contentData.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE));
});

router.get("/data/content/:id/", (req, res) => {
  res.json(contentData[Number(req.params.id)]);
});

exports.router = router;
