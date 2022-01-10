import React, { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { getBrands } from '../functions/brand';
import Footer from '../components/footer/footer';
import BrandPagination from '../components/pagination/BrandPagination';

const Brand = () => {
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([])

    const loadBrands = () =>
        getBrands().then(b => setBrands(b.data)).catch(e => console.log)

    useEffect(() => {
        loadBrands()
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        {
                            loading ?
                                (
                                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                        <LoadingOutlined />
                                    </h4>
                                )
                                :
                                (
                                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                        {brands.length} Brands available
                                    </h4>
                                )
                        }
                    </div>
                </div>

                <div className='row'>
                    {brands &&
                        <BrandPagination brands={brands} loading={loading} />
                    }
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default Brand
