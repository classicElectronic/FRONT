import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getBrand, updateBrand } from '../../../functions/brand';
import CategoryForm from '../../../components/forms/CategoryForm';
import FileUpload from '../../../components/forms/FileUpload';
import Footer from '../../../components/footer/footer';

const initialState = {
    name: '',
    images: [],
}

const BrandUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [values, setValues] = useState(initialState);
    const { name } = values;
    // const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(match.params.slug);
        loadBrand();
    }, []);

    const loadBrand = () =>
        getBrand(match.params.slug).then((b) => {
            setValues({ ...values, ...b.data.brand })
            // console.log('data', b.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        setLoading(true);
        updateBrand(match.params.slug, values, user.token)
            .then((res) => {
                setLoading(false);
                // setName('');
                setValues(initialState)
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/brand');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status) toast.error(err.response.data);
            });
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(`${e.target.name} ------- ${e.target.value}`);
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9 ">
                        {loading ?
                            (
                                <h4 className="text-danger">Loading..</h4>) :
                            (<h4>Update Brand</h4>
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
                            handleChange={handleChange} />
                        <hr />
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default BrandUpdate;
