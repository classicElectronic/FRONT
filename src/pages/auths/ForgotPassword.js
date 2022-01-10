import React, { useState, useEffect } from 'react';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';


const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT ||
                "https://reverent-joliot-1cccd7.netlify.app/login/",
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success("Check your Email for Password reset link");
            }).catch((err) => {
                setLoading(false);
                console.log("Error message forgot password", err);
                toast.error(err.message);
            })
    }
    return (
        <>
            <div className="container col-md-6 offset-md-3 p-5">
                {loading ? (<h4>loading.....</h4>) : (<h4>Forgot Password</h4>)}

                <form onSubmit={handleSubmit}>
                    <input type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type your Email"
                        autoFocus
                    />
                    <br />
                    <button className="btn btn-raised" disabled={!email}>
                        Submit
                    </button>
                </form>

            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default ForgotPassword;