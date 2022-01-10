import React from 'react'

const Pagination = ({ productPerPage, totalProduct, paginate, currentPage }) => {

    const pageNumbers = []

    // get the correct page numbers
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className='row justify-content-around mt-4 mb-4'>

            <ul className='pagination'>
                {
                    pageNumbers.map(num => (
                        <li key={num} className='page-item'
                        // style={{ border: '1px solid', borderRadius: '90%' }}
                        >
                            <a
                                onClick={() => paginate(num)}
                                className='page-link' style={{ fontWeight: 'bold' }}>
                                {num}
                            </a>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default Pagination
