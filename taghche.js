const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("taghche.json");

request("https://fidibo.com/", (err, response, html) => {
  if (!err && response.statusCode == 200) {
    const $ = cheerio.load(html);
    let image;
    let name;
    let obj = { books: [] };
    let json;
    const bookimage = $(".book-slide").each((i, el) => {
      image = $(el).find("img").attr("data-src");
      name = $(el).find("span a").text();

      obj.books.push({ id: i, image: image, name: name });

      json = JSON.stringify(obj);
    });
    writeStream.write(json);
  }
});
