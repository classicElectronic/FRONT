import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { getBrands } from '../../../functions/brand';
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import Footer from '../../../components/footer/footer'

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    brands: [],
    color: [],
    brand: '',
}


const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOption, setSubOption] = useState('');
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategeries();
    }, []);

    const loadCategeries = () =>
        getCategories().then((c) => {
            setValues({ ...values, categories: c.data })
            // console.log('data cat', c.data);
        });

    const loadBrands = () =>
        getBrands().then((b) => {
            setValues({ ...values, brands: b.data })
            // console.log('data brand', b.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('product values', values);
        createProduct(values, user.token)
            .then(res => {
                // console.log(res);
                window.alert(`${res.data.title} is created`);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                if (err.response.status) {
                    // toast.error(err.response.data);
                    toast.error(err.response.data.err);
                }
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(`${e.target.name} ------- ${e.target.value}`);
    }
    const handleBrandChange = (e) => {
        e.preventDefault()
        setValues({ ...values, brand: e.target.value });
        // console.log('value', e.target.value);
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        // console.log("CliCKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                // console.log('SUB OPTION ON CATEGORY CLIKCED', res);
                setSubOption(res.data);
            });
        setShowSub(true);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9">
                        {loading ? (
                            <LoadingOutlined className="text-danger h1" />
                        )
                            : (
                                <h4>Product Create</h4>
                            )}
                        <hr />

                        <div className="p-3">
                            <FileUpload values={values} setValues={setValues}
                                setLoading={setLoading} loading={loading} />
                        </div>

                        <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            handleCategoryChange={handleCategoryChange}
                            subOption={subOption}
                            showSub={showSub}
                            loadBrands={loadBrands}
                            handleBrandChange={handleBrandChange}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default ProductCreate;