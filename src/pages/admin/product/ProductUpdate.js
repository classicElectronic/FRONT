import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { getBrands } from '../../../functions/brand';
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import Footer from '../../../components/footer/footer'

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    color: [],
    brand: '',
}


const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [subOption, setSubOption] = useState([]);
    const [categories, setCategorties] = useState([]);
    const [brands, setBrands] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    // router
    let { slug } = match.params;
    let stringOfColors = []

    useEffect(() => {
        loadProduct();
        loadCategeries();
        loadBrands();
    }, []);



    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                console.log(p);
                // 1 load single product
                setValues({ ...values, ...p.data })

                p.data.color.map((c) => stringOfColors.push(c))
                // console.log('color', stringOfColors);

                // 2 load single product category subs
                getCategorySubs(p.data.category._id)
                    .then(res => {
                        // on first load show default subs
                        setSubOption(res.data)
                    });
                // 3 prepare array of sub ids to show as default sub values in ant design select
                let arr = [];
                p.data.subs.map((s) => arr.push(s._id));

                // console.log("array", arr);
                setArrayOfSubIds((prev) => arr) //required for ant design select to work
            });
    }

    const loadCategeries = () =>
        getCategories().then((c) => {
            // console.log("update product get categories ", c.data);
            setCategorties(c.data)
        });
    const loadBrands = () =>
        getBrands().then((b) => {
            // console.log("update product get brands ", b.data);
            setBrands(b.data)
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubIds;
        values.category = selectedCategory ? selectedCategory : values.category;
        values.brand = selectedBrand ? selectedBrand : values.brand;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                // toast.error(err.response.data);
                toast.error(err.response.data.err);
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(`${e.target.name} ------- ${e.target.value}`);
    }

    const handleBrandChange = (e) => {
        e.preventDefault()
        setSelectedBrand(e.target.value);
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        // console.log("CliCKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
            .then(res => {
                // console.log('SUB OPTION ON CATEGORY CLIKCED', res);
                setSubOption(res.data);
            });
        // if user clicks back to the original category
        // show its subs categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        // clear all sub category ids
        setArrayOfSubIds([]);
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
                                <h4>Product Update</h4>
                            )}
                        <hr />
                        {/* {JSON.stringify(values)} */}

                        <div className="p-3">
                            <FileUpload values={values} setValues={setValues}
                                setLoading={setLoading} loading={loading} />
                        </div>

                        <ProductUpdateForm
                            stringOfColors={stringOfColors}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            handleCategoryChange={handleCategoryChange}
                            handleBrandChange={handleBrandChange}
                            categories={categories}
                            brands={brands}
                            subOption={subOption}
                            arrayOfSubIds={arrayOfSubIds}
                            setArrayOfSubIds={setArrayOfSubIds}
                            selectedCategory={selectedCategory}
                            selectedBrand={selectedBrand}
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

export default ProductUpdate;