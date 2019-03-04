const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/acme_products_faker');

const faker = require('faker');

const Category = conn.define('category', {
    name: Sequelize.STRING
});

const Product = conn.define('product', {
    name: Sequelize.STRING
});

Product.belongsTo(Category);
Category.hasMany(Product);



const syncAndSeed = () => {
    return conn.sync({ force: true })
        .then(() => {
            const names = [];
            let count = 5;
            while (count > 0) {
                names.push(faker.commerce.department());
                count--;
            }
            return Promise.all(names.map(name => Category.create({ name })))
        })
        .then((categories) => {
            return Promise.all(categories.map((category) => {
                const names = [];
                let count = 2;
                while (count > 0) {
                    names.push(faker.commerce.productName());
                    count--;
                }
                return Promise.all(names.map(name => Product.create({
                    name: name,
                    categoryId: category.id
                })))
            }))
        })
}

syncAndSeed();

module.exports = {
    syncAndSeed,
    models: {
        Product,
        Category
    }
}
