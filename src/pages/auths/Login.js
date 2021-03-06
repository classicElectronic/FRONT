import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../Firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser, updateUser, currentUser } from '../../functions/auth';
import Footer from '../../components/footer/footer'

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [phone, setPhone] = useState('')

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push('/');
        }
    }, [user, history]);

    let dispatch = useDispatch();


    const roleBaseRedirect = (res) => {

        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from)
        } else {
            if (res.data.role === "admin") {
                history.push('/admin/dashboard');
            } else {
                history.push('/user/history');
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            // console.log("result", result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            // currentUser(idTokenResult.token)
            //     .then(res => {
            //         setPhone(res.data.number)
            //         // console.log('res', res.data.number);
            //         console.log('phone', phone);
            //     }).catch(e => console.log(e))

            updateUser(idTokenResult.token)
                .then(
                    (res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                number: res.data.number,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                        roleBaseRedirect(res);
                    }
                )
                .catch((err) => console.log(err));

        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                    .then(
                        (res) => {
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
                                    name: res.data.name,
                                    email: res.data.email,
                                    number: res.data.number,
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                    _id: res.data._id,
                                },
                            });
                            roleBaseRedirect(res);
                        }
                    )
                    .catch((err) => console.log(err));
                // history.push('/');

            }).catch((err) => {
                console.log(err);
                toast.error(err.message);
            })
    };

    const loginFrom = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="email" className="form-control"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus />
        </div>
        <div className="form-group">
            <input type="password" className="form-control"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Your Password"
            />
        </div>
        <br />
        <Button onClick={handleSubmit}
            type="primary"
            className="mb-3 mobileHidden"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6 || loading}>
            Login With Email and Password
        </Button>
        <Button onClick={handleSubmit}
            type="primary"
            className="mb-3 mobileVisible"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6 || loading}>
            Login With Email
        </Button>
    </form>

    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Login</h4>)}
                        {loginFrom()}
                        <Button onClick={googleLogin}
                            type="danger"
                            className="mb-3"
                            block
                            shape="round"
                            icon={<GoogleOutlined />}
                            size="large">
                            Login With Google
                        </Button>
                        <Link to="/forgot/password" className="float-right text-danger">
                            Forogot Password ?
                        </Link>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default Login;
