import React, { useState, useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import Pagination from './Pagination'

const ShopPagination = ({ products, loading }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage, setProductPerPage] = useState(12)

    // get current products
    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct)

    // change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        currentProduct.map(
                            (p) =>
                                <div className="col-md-3 col-6 mb-3" key={p._id}>
                                    <ProductCard product={p} />
                                </div>
                        )
                    }
                </div>
            </div>
            <div className='container'>
                <Pagination productPerPage={productPerPage}
                    totalProduct={products.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
}

export default ShopPagination
