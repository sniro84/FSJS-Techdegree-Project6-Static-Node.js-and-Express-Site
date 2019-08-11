const express = require('express');
const data = require('./data/data.json');
const projects = data.projects;

const app = express();

app.set('view engine' , 'pug');

app.use('/static',express.static('public'));

app.use('/images',express.static('images'));

app.listen(3000 , () => {
    console.log("Listening to port 3000...");
});

app.get('/' , (req,res) => {
    res.render('index' , {projects});
});

app.get('/about' , (req,res) => {
    res.render('about');
});

app.get('/projects/:id' , (req,res) => {
    res.render('project' , {
        id: projects[req.params.id].id ,
        name: projects[req.params.id].project_name ,
        description: projects[req.params.id].description , 
        technologies: projects[req.params.id].technologies ,
        live_link: projects[req.params.id].live_link ,
        github_link: projects[req.params.id].github_link ,
        image_urls: projects[req.params.id].image_urls
    });
});