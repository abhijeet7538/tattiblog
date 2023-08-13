const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome, fellow starry-eyed Jedi and Sith aficionados, to a corner of the galaxy where the Force is strong and the laughter is even stronger. Our blog isn't just another boring old podracing circuit—it's a lightspeed journey through the far reaches of Star Wars knowledge, sprinkled with enough humor to make even a protocol droid crack a smile. Imagine Yoda sharing knock-knock jokes or Darth Vader attempting stand-up comedy (his 'I am your father' punchline is killer). So, grab your blaster, hop on your speeder, and prepare to warp into a hyperspace of intergalactic chuckles and Jedi-level insights. Whether you're a Padawan or a seasoned Jedi Master, our blog is your hyperdrive to hilarity and wisdom from a galaxy far, far away. May the laughs be with you!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://abhi:abhi123@cluster0.achnpco.mongodb.net/blogDB",)

const postSchema = {
    title: String,
    content: String
}

const Post = mongoose.model('Post', postSchema);


app.get("/", function (req, res) {
    async function fetchpost() {

        const posts = await Post.find({})
        try {
            res.render("home", {
                startingContent: homeStartingContent,
                posts: posts
            });
        } catch (err) {
            console.log("an error occured in app.get");
        }
    }
    fetchpost();
});

// app.get("/post/:zoro", function (req, res) {
//     const requested_params = _.lowerCase(req.params.zoro);
//     Post.forEach(function (post) {
//         const stored_title = _.lowerCase(post.title);
//         if (stored_title === requested_params) {
//             res.render("post", {
//                 title: post.title,
//                 content: post.content
//             });
//         }
//     });

// });

app.get("/about", function (req, res) {
    res.render("about", { about_c: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactcontet: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    async function savepost() {
        try {
            post.save();
            res.redirect("/");
        }
        catch (err) {
            console.log("eroor ocuured in saving");
        }
    }
    savepost();
});

app.get("/post/:postId", function (req, res) {
    const requestedId = req.params.postId;
    Post.findOne({ _id: requestedId })
        .then((post) => {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        })
        .catch((err) => {
            console.log("error ocured in finding");
        })

});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
