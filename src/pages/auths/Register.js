import React, { useState, useEffect } from 'react';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import { Button } from 'antd';

const Register = ({ history }) => {
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        // 
        e.preventDefault();
        // console.log("ENV ------->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        if (!email) {
            toast.error('an email is required to register')
            return
        }
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL ||
                "https://reverent-joliot-1cccd7.netlify.app/register/complete",
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config)
            .then(() => {
                toast.success(
                    `Email is sent to ${email}, Click the link to complete your registration`
                );
                window.localStorage.setItem('emailForRegistration', email);
                setEmail('');
            })
            .catch(e => {
                console.log(e);
                toast.error('The email address is badly formatted', e)
            });

    }
    const registerFrom = () => <form onSubmit={handleSubmit}>
        <input type="email" className="form-control"
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
            autoFocus />
        <br />
        <Button type="primary" onClick={handleSubmit} className="">
            Register
        </Button>

    </form>

    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Register</h4>
                        {registerFrom()}
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default Register;
