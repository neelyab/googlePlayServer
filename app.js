const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('common'));
app.use(cors());
const playApps = require('./google-data');

app.get('/apps', (req, res)=>{
    const {genre = ""} = req.query;
    const {sort} = req.query;
    console.log(genre)
    let results = playApps.filter(a=>
        a.Genres.toLowerCase().includes(genre.toLowerCase()))
    if(sort){
        if(!['Rating', 'App'].includes(sort)){
            return res.status(400).send('sort must include rating or app');
        }
    }
    if (sort){
        results.sort((a,b)=>{
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }
    res.json(results)
})
module.exports = app;

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });