import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createBrand,
    getBrands,
    removeBrand
} from '../../../functions/brand';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import FileUpload from '../../../components/forms/FileUpload';
import Footer from '../../../components/footer/footer';

const initialState = {
    name: '',
    images: [],
}

const BrandCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [values, setValues] = useState(initialState);
    const { name } = values;
    const [brands, setBrands] = useState([]);
    // const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    // searching/filtering
    // setp 1
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategeries();
    }, []);

    const loadCategeries = () =>
        getBrands().then((c) => setBrands(c.data));

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(`${e.target.name} ------- ${e.target.value}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createBrand(values, user.token)
            .then((res) => {
                // setLoading(false);
                // setName('');
                // setValues(initialState);
                // toast.success(`"${res.data.name}" is created`);
                // loadCategeries();
                window.alert(`${res.data.name} is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status) toast.error(err.response.data);
            });
    };
    const handleRemove = async (slug) => {
        // let answer = window.confirm("Are you sure want to Delete ?");
        // console.log(answer, slug);

        if (window.confirm("Are you sure want to Delete ?")) {
            setLoading(true);
            removeBrand(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategeries();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    };
                })
        }
    };


    // setp 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9">
                        {loading ?
                            (
                                <h4 className="text-danger">Loading..</h4>) :
                            (<h4>Create Brand</h4>
                            )}
                        <hr />

                        <div>
                            <FileUpload values={values} setValues={setValues}
                                setLoading={setLoading} loading={loading} />
                        </div>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name={name}
                            loading={loading}
                            handleChange={handleChange}
                        />
                        <hr />
                        {/* step 2 and step 3 */}
                        <LocalSearch
                            keyword={keyword}
                            setKeyword={setKeyword}
                        />

                        <hr />
                        {/* step 5 */}
                        {brands.filter(searched(keyword)).map((c) => (
                            <div className="alert alert-secondary" key={c._id}>
                                {c.name}
                                <span
                                    onClick={() => handleRemove(c.slug)}
                                    className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/brand/${c.slug}`}>
                                    <span className="btn btn-sm float-right">
                                        <EditOutlined className="text-warning" />
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default BrandCreate;
