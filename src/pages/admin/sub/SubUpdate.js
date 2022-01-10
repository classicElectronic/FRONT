import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateSub, getSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import FileUpload from '../../../components/forms/FileUpload';
import Footer from '../../../components/footer/footer';

const initialState = {
    name: '',
    images: [],
    parent: '',
}

const SubCreate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [values, setValues] = useState(initialState);
    const { name, parent } = values;
    const [categories, setCategories] = useState([]);
    // const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    // const [parent, setParent] = useState('');

    useEffect(() => {
        loadCategeries();
        loadSub();
    }, []);

    const loadCategeries = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setValues({ ...values, ...s.data.sub })
            // console.log(s.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        setLoading(true);
        updateSub(match.params.slug, values, user.token)
            .then((res) => {
                setLoading(false);
                // setName('');
                setValues(initialState)
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/sub');
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

                    <div className="col-md-9">
                        {loading ?
                            (
                                <h4 className="text-danger">Loading..</h4>) :
                            (<h4>Update Sub Category</h4>
                            )}

                        <div className="form-group">
                            <label>Parent Category</label>
                            <select
                                name="parent"
                                disabled={loading}
                                className="form-control"
                                onChange={handleChange}>

                                <option>Please Select</option>
                                {categories.length > 0 && categories
                                    .map((c) => (
                                        <option key={c._id} value={c._id}
                                            selected={c._id === parent}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <FileUpload values={values} setValues={setValues}
                                setLoading={setLoading} loading={loading} />
                        </div>
                        <hr />
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

export default SubCreate;
