const express = require("express");                //express use for nodejs code to write in simple way using methods
const path = require("path");                     // provides the utilities for working with file and directory paths
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const port = 3005;




//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('Contact', contactSchema);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));      // serving static files like HTML, CSS, and images, improving performance
app.use(express.urlencoded({ extended: true }))      // to support URL-encoded bodies




// // PUG SPECIFIC STUFF
app.set('view engine', 'pug')     // set templet engine as a pug
app.set('views', path.join(__dirname, 'views'))   // set the view directory



// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})


app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})



app.post('/contact', (req, res) => {
    let myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    })

})




// START THE SERVER
app.listen(port, () => {
    console.log(`This app is started successfully on port ${port}`);
})
