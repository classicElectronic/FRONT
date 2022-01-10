import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/footer';
import { Button } from 'antd';
import UpdateNumber from './UpdateNumber';

const Password = () => {


    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                toast.success("Password Updated");
                setPassword('');
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const PasswordUpdateForm = () => (
        <div className='container-fluid mt-4'>
            <div className='row justify-content-around'>
                <div className='col-9 col'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-center">
                            {/* <label>Your Password</label> */}
                            <div className='row'>
                                <div className='col-8 col'>
                                    <input type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter new password"
                                        autoFocus
                                        disabled={loading}
                                        value={password}
                                    />
                                </div>
                                <div className='col-4 col'>
                                    <Button
                                        onClick={handleSubmit}
                                        type='primary'
                                        className=""
                                        disabled={!password || password.length < 6 || loading}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-2 mobileHidden">
                        <UserNav />
                    </div>

                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger text-center">Loading</h4>)
                            : (
                                <h4 className='text-center'>Update Profile settings </h4>)
                        }
                        <hr />
                        {PasswordUpdateForm()}
                        <hr />
                        <UpdateNumber />
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
};

export default Password;