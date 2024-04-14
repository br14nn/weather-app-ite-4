const express = require("express");
const weather = require("weather-js");

const app = express();
app.set("view engine", "ejs");

const port = 3000;

app.use(express.static("views"));
app.use(express.static("components"));

app.get("/:place", (req, res) => {
  weather.find({ search: req.params.place, degreeType: "C" }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let flag = "";
      let data = eval(JSON.stringify(result, null, 2));

      console.log(data[0]);

      if (data[0].location.name === "Davao, Philippines") {
        flag = "https://cdn-icons-png.flaticon.com/512/197/197561.png";
      } else if (data[0].location.name === "Los Angeles, CA") {
        flag = "https://cdn-icons-png.flaticon.com/512/197/197484.png";
      } else if (data[0].location.name === "Tokyo, Japan") {
        flag = "https://cdn-icons-png.flaticon.com/512/197/197604.png";
      } else if (data[0].location.name === "London, United Kingdom") {
        flag = "https://cdn-icons-png.flaticon.com/512/197/197374.png";
      } else if (data[0].location.name === "Moscow, Russia") {
        flag = "https://cdn-icons-png.flaticon.com/512/197/197408.png";
      } else {
        flag = "";
      }

      res.render("index", {
        flag: flag,
        location: data[0].location.name,
        forecast: data[0].forecast,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
