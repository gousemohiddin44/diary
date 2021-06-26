const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const lodash = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let posts = [];

const homeContent = "Do whatever it takes to complete the challenge and don't give up . And this diary is going to be your number 1 friend in this journey. Make sure you write important stuff of the day and plan things for tomorrow.";
const aboutContent = "Hii! I'm Shaik Gouse Mohiidin , age 22 height 5.7' and weight 70kgs . I'm a programmer analyst trainee at Cognizant and I only got the job recently . My hobbies include watching movies , creating websites and also overthinking . But now i want to change myself so this diary is a step in that direction . Thank You."
const contactContent = "You can contact me at shaikgousenri@gmail.com or can call me on 9014775115."

app.get("/posts/:topic", (req, res) => {
    posts.forEach((ele) => {
        if (lodash.lowerCase(req.params.topic) == lodash.lowerCase(ele.postTitle)) {
            res.render("post", { postinfo: ele });
        }
    });
});

app.get("/", (req, res) => {
    res.render("home", { Content: homeContent, post: posts });
});

app.get("/about", (req, res) => {
    res.render("about", { Content: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { Content: contactContent });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const postObject = {
        postTitle: req.body.titleText,
        postBody: req.body.newText
    };
    posts.push(postObject);
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, () => {
    console.log("server running on port 3000");
})