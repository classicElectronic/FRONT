import React, { useState, useEffect } from 'react'
import { getSub } from '../../functions/sub';
// import ProductCard from '../../components/cards/ProductCard';
import { LoadingOutlined } from '@ant-design/icons'
import Footer from '../../components/footer/footer'
import ShopPagination from '../../components/pagination/ShopPagination';

const SubHome = ({ match }) => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getSub(slug)
            .then((res) => {
                setLoading(false);
                // console.log(JSON.stringify(res.data, null, 4));
                setSub(res.data.sub);
                setProducts(res.data.products);
            })
    }, [])

    return (
        <>
            <div className="container">
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
                                        {products.length} Products in "{sub.name}" sub category
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

export default SubHome