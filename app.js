/******************************************
Treehouse FSJS Techdegree:
Project 6 - Static Node.js and Express Site
Name: Snir Holland
Date: 12/08/2019
******************************************/

// port number
const PORT = process.env || 3000;

// start express
const express = require('express');
const app = express();

// extract data from json file and store it 
const data = require('./data/data.json');
const projects = data.projects;

// set pug as view engine
app.set('view engine' , 'pug');

// allow access to 'public' folder
app.use('/static',express.static('public'));
// allow access to 'images' folder
app.use('/images',express.static('images'));

// home page route
app.get('/' , (req,res) => {
    res.render('index' , {projects});
});

// about route
app.get('/about' , (req,res) => {
    res.render('about');
});

// projects route
app.use('/projects/:id' , (req,res,next) => {
    if (req.params.id >= 0 && req.params.id < projects.length)  // valid project id
        res.render('project' , {
            id: projects[req.params.id].id ,
            name: projects[req.params.id].project_name ,
            description: projects[req.params.id].description , 
            technologies: projects[req.params.id].technologies ,
            live_link: projects[req.params.id].live_link ,
            github_link: projects[req.params.id].github_link ,
            image_landing_url: projects[req.params.id].image_landing_url ,
            image_urls: projects[req.params.id].image_urls
        });
    else // invalid project id
    {
        const err = new Error('Requested page not found');
        err.status = 404;
        next(err);  // call to middleware error handling function
    }
});

// invalid route
app.use( (req,res,next) => {
    const err = new Error('Requested page not found');
    err.status = 404;
    next(err);  // call to middleware error handling function
});

// middleware error handling function
app.use( (err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log("error 404: Requested page not found.");  
    res.render('error');
});

// listen for connection on a port
app.listen(PORT , () => {
    console.log("Listening to PORT...");
});