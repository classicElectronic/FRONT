import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Footer from '../../../components/footer/footer'
// import { Link } from 'react-router-dom';
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';
import AllProductsPagination from '../../../components/pagination/AllProductsPagination';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('')

    // redux
    const { user } = useSelector((state) => ({ ...state }))



    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);

        getProductsByCount(100)
            .then((res) => {
                // console.log(res.data)
                setProducts(res.data)
                setLoading(false);
            })
            .catch((res) => {
                setLoading(false);
                console.log(res.data)
            });
    };

    const handleRemove = (slug) => {

        let answer = window.confirm("Delete ?")
        if (answer) {
            // console.log("send delete request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`)
                })
                .catch((err) => {
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err);
                })
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9">
                        {loading ? (
                            <h4 className="text-danger">Loading</h4>
                        ) : (
                            <h4>All products</h4>
                        )}

                        <hr />
                        {/* step 2 and step 3 */}
                        <LocalSearch
                            keyword={keyword}
                            setKeyword={setKeyword}
                        />
                        <div className="row">
                            <AllProductsPagination
                                products={products}
                                keyword={keyword}
                                handleRemove={handleRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default AllProducts;
