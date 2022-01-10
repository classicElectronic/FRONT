import React, { useEffect, useState } from 'react'
import {
    getProducts,
    //  getProductsCount
} from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
// import { Pagination } from 'antd';

const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
        // console.log('page state', page);
    }, []);

    // useEffect(() => {
    //     loadAllProducts();
    //     // console.log('page state', page);
    // }, [page]);

    // useEffect(() => {
    //     getProductsCount().then((res) => setProductsCount(res.data));
    // }, []);

    // console.log('products count', productsCount);

    const loadAllProducts = () => {
        setLoading(true);

        getProducts('createdAt', 'desc', page)
            .then((res) => {
                setProducts(res.data)
                setLoading(false);
            })
            .catch((res) => {
                setLoading(false);
                console.log(res.data)

            });
    };


    return (
        <>
            <div className="container">
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-3 pb-1 col-6">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>)
                }
            </div>
            {/* <nav className="col-md-4 offset-md-4 text-center p-3">
                <Pagination current={page} total={(productsCount / 4) * 10}
                    onChange={(value) => setPage(value)}
                />
            </nav> */}
        </>
    );
}

export default NewArrivals;
