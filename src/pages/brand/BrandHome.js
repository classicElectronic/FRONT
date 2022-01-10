import React, { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { getBrand } from '../../functions/brand'
// import ProductCard from '../../components/cards/ProductCard';
import Footer from '../../components/footer/footer';
import ShopPagination from '../../components/pagination/ShopPagination';

const BrandHome = ({ match }) => {
    const [brand, setBrand] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getBrand(slug)
            .then((res) => {
                setLoading(false);
                // console.log(JSON.stringify(res.data, null, 4));
                setBrand(res.data.brand);
                setProducts(res.data.products);
            })
    }, [])

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col">
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
                                        {products.length} Products in brand "{brand.name}"
                                    </h4>
                                )
                        }
                    </div>
                </div>

                <div className="row">
                    {
                        products &&
                        <ShopPagination products={products} loading={loading} />
                    }
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default BrandHome
