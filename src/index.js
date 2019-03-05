import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import List from './List'

const root = document.querySelector('#root');
console.log(root);

class Main extends Component {
    constructor() {
        super()
        this.state = { categories: [] }
        this.createCat = this.createCat.bind(this);
        this.destroyCat = this.destroyCat.bind(this);
        this.createProd = this.createProd.bind(this);
        this.destroyProd = this.destroyProd.bind(this);

    }
    componentDidMount() {
        axios.get('/api/categories')
            .then(response => response.data)
            .then(categories => this.setState({ categories: categories }))
            .then(() => console.log(this.state.categories))
    }
    createCat() {
        axios.post('/api/categories')
            .then(() => {
                axios.get('/api/categories')
                    .then(response => response.data)
                    .then(categories => this.setState({ categories }))
            })
    }
    destroyCat(id) {
        axios.delete(`/api/categories/${id}`)
            .then(() => {
                console.log('hello');
                let categories = this.state.categories;
                categories = categories.filter(category => category.id !== id);

                this.setState({ categories });
            })
    }
    createProd(id) {
        axios.post(`/api/categories/${id}/products`)
            .then(response => response.data)
            .then(product => {
                const idx = this.state.categories.findIndex(category => category.id === id);
                const categories = this.state.categories;
                categories[idx].products.push(product);
                this.setState({ categories });

            })
    }
    destroyProd(id, catId) {
        axios.delete(`/api/products/${id}`)
            .then(() => {
                const idx = this.state.categories.findIndex(category => category.id === catId);
                const categories = this.state.categories;
                categories[idx].products = categories[idx].products.filter(product => product.id !== id);
                this.setState({ categories });

            })
    }
    render() {
        const { createCat, destroyCat, createProd, destroyProd } = this;

        return (
            <div>
                <h1>Acme Categories and Products by faker</h1>
                <button onClick={() => createCat()} className="btn btn-primary">+</button>
                <List categories={this.state.categories} destroyCat={destroyCat} createProd={createProd} destroyProd={destroyProd} />
            </div>
        )
    }

}
ReactDOM.render(
    <Main />,
    root
)
