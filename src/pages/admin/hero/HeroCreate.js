import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import Footer from '../../../components/footer/footer'
import HeroAdminForm from '../../../components/forms/HeroAdminForm'
import { getHeros, removeHero, createHero } from '../../../functions/hero';
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const initialState = {
    slogan: '',
    buttonInfo: '',
    color: '',
    images: [],
}

const HeroCreate = () => {

    const { user } = useSelector((state) => ({ ...state }))

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [heros, setHeros] = useState([])

    useEffect(() => {
        loadHeros()
    }, [])
    // console.log(heros);

    const loadHeros = () =>
        getHeros().then(h => setHeros(h.data)).catch(e => console.log(e))

    const handleRemove = async (heroId) => {
        if (window.confirm('Are you sure you want to delete the hero')) {
            setLoading(true)
            removeHero(heroId, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.error(`hero ${res.data._id} is deleted`)
                    loadHeros()
                })
                .catch((e) => {
                    setLoading(false);
                    toast.error(e.response.data);
                    return;
                })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(values);
        createHero(
            values,
            user.token
        ).then((res) => {
            setLoading(false);
            setValues(initialState);
            window.alert(`${res.data._id} is created`);
            window.location.reload();

        }).catch(err => {
            if (err.response.status === 400) {
                setLoading(false);
                toast.error(err.response.data);
                return;
            };
            console.log('create coupon error', err)
        });
    }

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
                        <div className='container-fluid'>
                            <div className='row justify-content-around mb-4'>
                                <h4 className='text-center'>Create hero section</h4>
                            </div>
                            <div className='row'>
                                <HeroAdminForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    loading={loading}
                                    setLoading={setLoading}
                                    setValues={setValues}
                                    values={values}
                                />
                            </div>
                            <hr />
                            <div className='row'>
                                <h4>List of Hero section</h4>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {/* numero of hero {heros.length} */}
                                        {heros && heros.map(h => (
                                            <>
                                                <div key={h._id} className='col-md-4'>
                                                    <div className='mb-2'>
                                                        <img style={{ width: '100%', height: '100%' }}
                                                            src={h.images[0].url} alt={h._id} />
                                                    </div>
                                                    {/* <h3>{h.slogan}</h3> */}
                                                    <div>
                                                        <Button onClick={() => handleRemove(h._id)} type='primary' danger>
                                                            <DeleteOutlined /> Remove
                                                        </Button>
                                                    </div>
                                                    <hr />

                                                </div>
                                                <hr />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default HeroCreate
