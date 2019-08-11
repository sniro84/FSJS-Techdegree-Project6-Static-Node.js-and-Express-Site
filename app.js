const express = require('express');
const data = require('./data/data.json');
const projects = data.projects;

const app = express();

app.set('view engine' , 'pug');

app.use('/static',express.static('public'));

app.use('/images',express.static('images'));

app.get('/' , (req,res) => {
    res.render('index' , {projects});
});

app.get('/about' , (req,res) => {
    res.render('about');
});

app.use('/projects/:id' , (req,res,next) => {
    if (req.params.id >= 0 && req.params.id < projects.length)
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
    else
    {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

});

app.use( (req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use( (err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');  
});

app.listen(3000 , () => {
    console.log("Listening to port 3000...");
});