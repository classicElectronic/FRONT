import React, { useState } from 'react'
import AdminProductCard from '../cards/AdminProductCard'
import Pagination from './Pagination'

const AllProductsPagination = ({ products, keyword, handleRemove }) => {

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

    // setp 4
    const searched = (keyword) => (p) => p.title.toLowerCase().includes(keyword);

    return (
        <>
            {currentProduct.filter(searched(keyword)).map((product) => (
                <div className="col-md-3 col-6 pb-4" key={product._id} >
                    <AdminProductCard
                        handleRemove={handleRemove}
                        product={product} />
                </div>
            )
            )}
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

export default AllProductsPagination
