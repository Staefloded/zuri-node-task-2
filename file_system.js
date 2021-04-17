const fs = require("fs");
const http = require("http");

http
  .get("http://jsonplaceholder.typicode.com/posts", (res, req) => {
    let error;

    if (res.statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${res.statusCode}`);
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        return fs.writeFile("./result/posts.json", JSON.stringify(parsedData), (err) => {
          if (err) throw err;
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
