
const express = require("express");
const app = express();
const port = 8080;

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get("/",(req, res) => {
    console.log("Request send on the main root.");
    res.send("Hello I am main root.");
});

app.get("/:username",(req, res) => {
    console.log(req.params);E
    res.send("Hello I am root");
});

app.get("/:username/:id",(req, res) =>{
    let {username, id} = req.params;
    let htmlStr = `<h1>Welcome to page of @${username}!</h1>`
    res.send(htmlStr);
});

app.get("/search",(req, res) => {
    console.log("Req send on the query search");
    let {q} = req.query;
    if(!q){
        res.send("<h1>Query doesnot search</h1>");
    }
    res.send(`<h1>search result for query: ${q}</h1>`);
});

app.all(/.*/, (req, res) => {
    console.log("request does not match");
    res.send("This path does not exist");
});

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});


