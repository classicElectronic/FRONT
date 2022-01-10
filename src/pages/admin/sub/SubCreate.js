import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createSub,
    getSubs,
    removeSub
} from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import FileUpload from '../../../components/forms/FileUpload';
import Footer from '../../../components/footer/footer';

const initialState = {
    name: '',
    images: [],
    parent: '',
}

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));


    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState(initialState);
    const { name } = values;
    const [loading, setLoading] = useState(false);
    // const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);

    // searching/filtering
    // setp 1
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategeries();
        loadSubs();
    }, []);

    const loadCategeries = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () =>
        getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        setLoading(true);
        createSub(values, user.token)
            .then((res) => {
                // setLoading(false);
                // setValues(initialState);
                // toast.success(`"${res.data.name}" is created`);
                // loadSubs();
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
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    };
                })
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(`${e.target.name} ------- ${e.target.value}`);
    }


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
                            (<h4>Create Sub Category</h4>
                            )}
                        <hr />
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
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='m-3 form-group'>
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
                        {/* step 2 and step 3 */}
                        <LocalSearch
                            keyword={keyword}
                            setKeyword={setKeyword}
                        />

                        <hr />
                        {/* step 5 */}
                        {subs.filter(searched(keyword)).map((s) => (
                            <div className="alert alert-secondary" key={s._id}>
                                {s.name}
                                <span
                                    onClick={() => handleRemove(s.slug)}
                                    className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
