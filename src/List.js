import React from 'react'

const List = ({ categories, destroyCat, destroyProd, createProd }) => {
    return (
        <ul className="list-group">
            {
                categories.map((category) => {
                    return (
                        <li key={category.id} className="list-group-item">
                            {category.name} {" "}
                            <button onClick={() => createProd(category.id)} className="btn btn-primary">+</button>
                            <button onClick={() => destroyCat(category.id)} className="btn btn-danger">x</button>
                            <ul className="list-group">
                                {category.products.map(product => {
                                    return (
                                        <li key={product.id} className="list-group-item">
                                            {product.name} {" "}
                                            <button onClick={() => destroyProd(product.id, category.id)} className="btn btn-danger">x</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })
            }
        </ul>)
}

export default List
