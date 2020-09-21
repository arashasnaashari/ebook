const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const taghche = require("../taghche.json");
// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
    taghche,
  })
);
router.get("/dashboard/book", ensureAuthenticated, (req, res) =>
  res.render("pdfbook")
);
router.get("/dashboard/:id", ensureAuthenticated, (req, res) => {
  const book = taghche.books.find((book) => book.id == req.params.id); // return Obj
  res.render("ebook", {
    book,
    user: req.user,
  });
});
module.exports = router;
