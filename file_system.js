const fs = require("fs");
const axios = require("axios").default;

(async function posts() {
  try {
    let res = await axios.get("http://jsonplaceholder.typicode.com/posts");

    if (res.statusText !== "OK") {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return fs.writeFile("./result/posts.json", JSON.stringify(res.data), (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
})();
