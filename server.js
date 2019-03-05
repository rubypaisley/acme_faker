const express = require('express');
const app = express();
const db = require('./db');
const { Product, Category } = db.models;
const faker = require('faker');
const path = require('path');
const port = 1800;

app.get('/api/categories', (req, res, next) => {
    Category.findAll({
        include: [Product]
    })
        .then(categories => res.json(categories))
        .catch(next)
})

app.post('/api/categories', (req, res, next) => {
    Category.create({ name: faker.commerce.department() })
        .then((category) => res.json(category))
        .catch(next)
})

app.post('/api/categories/:id/products', (req, res, next) => {
    Product.create({
        name: faker.commerce.productName(),
        categoryId: req.params.id
    })
        .then((product) => res.send(product))
        .catch(next)
})

app.delete('/api/categories/:id', (req, res, next) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })

        .then(() => res.send('ok!'))
        .catch(next)
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})
app.get('/app.js', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'main.js'))
})
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

db.syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
    .catch(e => console.log(e))

