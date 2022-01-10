import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../images/default.png'
import Pagination from './Pagination'

const BrandPagination = ({ brands, loading }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [brandsPerPage, setBrandsPerPage] = useState(6)

    // get current products
    const indexOfLastProduct = currentPage * brandsPerPage
    const indexOfFirstProduct = indexOfLastProduct - brandsPerPage
    const currentBrands = brands.slice(indexOfFirstProduct, indexOfLastProduct)

    // change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        currentBrands.map(
                            (b) =>
                                <div className="col-md-4 col-6 mb-3" key={b._id}>
                                    <Link to={`/brand/${b.slug}`}>
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src={b.images && b.images.length ? b.images[0].url : defaultImage}
                                            alt={b.name} />
                                    </Link>
                                    <div className='col text-center'>
                                        <Link to={`/brand/${b.slug}`}>{b.name}</Link>
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>
            <div className='container'>
                <Pagination productPerPage={brandsPerPage}
                    totalProduct={brands.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
}

export default BrandPagination
