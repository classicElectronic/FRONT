import React, { useState, useEffect } from 'react'
import { getCategory } from '../../functions/category';
// import ProductCard from '../../components/cards/ProductCard';
import Footer from '../../components/footer/footer'
import ShopPagination from '../../components/pagination/ShopPagination';

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
            .then((res) => {
                setLoading(false);
                // console.log(JSON.stringify(res.data, null, 4));
                setCategory(res.data.category);
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
                                        Loading.....
                                    </h4>
                                )
                                :
                                (
                                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                        {products.length} Products in "{category.name}" category
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

export default CategoryHome