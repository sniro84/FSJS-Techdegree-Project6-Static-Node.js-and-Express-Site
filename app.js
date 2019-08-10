const express = require('express');
const data = require('./data/data.json');
const projects = data.projects;

const app = express();

app.set('view engine' , 'pug');

app.use('/static',express.static('public'));

app.listen(3000 , () => {
    console.log("Listening to port 3000...");
});

app.get('/' , (req,res) => {
    res.render('index');
    res.locals.projects = projects;
    console.log(res.locals.projects);
});

app.get('/about' , (req,res) => {
    res.render('about');
});

app.get('/projects/:id' , (req,res) => {
    res.render('project' , {
        id: projects[req.params.id].id ,
        name: projects[req.params.id].project_name
    });

    // why is it null ?
    console.log(res.locals);

});