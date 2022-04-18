const router = require("express").Router();
const Post = require("../models/Post.model");
const NewsAPI = require("newsapi");

router.get("/", (req, res, next) => {
  let mixArr = [];

  Post.find()
    .populate("author")
    .then((postsfromDb) => {
      // console.log(postsfromDb)
      mixArr = mixArr.concat(postsfromDb);
    });

  const newsapi = new NewsAPI(process.env.API_KEY);

  newsapi.v2
    .everything({
      q:"technology",
      language: "en",
      sortBy: "publishedAt",
    })
    .then((data) => {
      mixArr = mixArr.concat(data.articles);

      mixArr.sort(function (a, b) {
        return a.publishedAt.localeCompare(b.publishedAt);
      });
      return mixArr.reverse();
      // res.render("post/news-thread", { article: data.articles });
    })
    .then(function (data) {
      console.log(data);
      res.render("index", { posts: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
