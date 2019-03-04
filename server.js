const express = require('express');
const app = express();
const db = require('./db');
const { Product, Category } = db.models;
const faker = require('faker');
const PORT = process.env.PORT || 3000;



app.get('/api/categories', (req, res, next) => {
    Category.findAll({
        include: [Product]
    })
        .then(categories => res.send(categories))
        .catch(next)
})

app.post('/api/categories', (req, res, next) => {
    Category.create({ name: faker.commerce.department() })
        .then((category) => res.send(category))
        .catch(next)
})

app.post('/api/categories', (req, res, next) => {

})

app.delete('/api/categories/:id', (req, res, next) => {

})

app.delete('/api/products/:id', (req, res, next) => {

})

db.syncAndSeed()
    .then(() => {
        app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    })
    .catch(() => console.log('oops! something went wrong'))
