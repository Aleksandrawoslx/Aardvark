const router = require("express").Router();
const NewsAPI = require("newsapi");

router.get("/", (req, res) => {
 
  const newsapi = new NewsAPI("f07b973466da4070a05742e1dc7d5a3c");
  newsapi.v2
    .everything({
      q:"technology",
      language: "en",
      sortBy: "publishedAt",
    })
    .then((data) => {
      res.render("post/news-thread", { article: data.articles });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/news-search", (req, res) => {
  const queryTerm = req.body.search;
  const newsapi = new NewsAPI(process.env.API_KEY);
  newsapi.v2
    .everything({
      q: queryTerm,
      language: "en",
      sortBy: "publishedAt",
    })
    .then((data) => {
      console.log(data.articles);
      res.render("post/news-thread", { article: data.articles });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
