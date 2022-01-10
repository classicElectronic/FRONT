import React, { useState, useEffect } from 'react';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';
import {
    useDispatch,
    // useSelector
} from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';
import Footer from '../../components/footer/footer';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Alert, Button } from 'antd'
import Cryptr from 'cryptr'
import { LoadingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import useDigitInput from 'react-digit-input';

const cryptr = new Cryptr('classic');

const RegisteComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [isverify, setIsVerify] = useState(false)
    const [info, setInfo] = useState('The Phone number will be used when contacting you on Whatsapp')
    const [enterDigit, setEnterDigit] = useState(false)
    const [alertType, setAlertType] = useState('info')
    const [code, setCode] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [isNotOk, setIsNotOk] = useState(false)

    const [value, onChange] = useState('');
    const digits = useDigitInput({
        acceptedCharacters: /^[0-9]$/,
        length: 6,
        value,
        onChange,
    });

    let lastDigit = digits[5].value


    let dispatch = useDispatch();

    // const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'));
    }, [history]);

    useEffect(() => {
        // console.log(lastDigit);
        if (lastDigit) {
            setCode(true)
            // console.log('code', value)
            setEnterDigit(false)

            checkDigits()
        }
    }, [value])

    const checkDigits = () => {
        const getEncryptedDigit = window.localStorage.getItem('verificationDigit')
        const decryptedDigit = cryptr.decrypt(getEncryptedDigit);
        console.log(decryptedDigit);
        if (decryptedDigit === value) {
            // alert('ok')
            setCode(false)
            setIsOk(true)
            register()
        } else {
            // alert('not ok')
            setCode(false)
            setIsNotOk(true)
        }
    }

    const register = async () => {
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log("RESULT ", result);
            // console.log("RESULT ", result.user.emailVerified);

            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                window.localStorage.removeItem('verificationDigit');
                // get user id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                // console.log('user', user, "idTokenResult", idTokenResult);

                createOrUpdateUser(idTokenResult.token, `+${phone}`)
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
                        }
                    )
                    .catch((err) => console.log(err));

                // redirect
                history.push('/');
            }
        }
        catch (error) {
            // 
            console.log(error);
            toast.error(error.message)
        }
    }
    const handleChangeNumber = (e) => {
        e.preventDefault()
        setLoading(false)
        setIsVerify(false)
        setEnterDigit(false)
        setCode(false)
        setIsNotOk(false)
        setIsOk(false)
        onChange('')
        setInfo('The Phone number will be used when contacting you on Whatsapp')
        setAlertType('info')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setIsVerify(true)
        setEnterDigit(true)
        // validation
        if (!email || !password || !phone || phone.length <= 4) {
            setLoading(false)
            setIsVerify(false)
            toast.error("Email, Password and Phone number are required");
            return;
        }

        if (password.length < 5) {
            setLoading(false)
            setIsVerify(false)
            toast.error("Password must be at least 6 characters");
            return;
        }
        setAlertType('warning')
        setInfo(`Enter a 6 digit code that has been sent to your whatsapp number +${phone}`)
        let digit = Math.floor(100000 + Math.random() * 900000)
        console.log(digit);
        const encryptedDigit = cryptr.encrypt(digit);
        // console.log(encryptedDigit);
        window.localStorage.setItem('verificationDigit', encryptedDigit);
    }

    const handleTryAgain = (e) => {
        e.preventDefault()
        setCode(false)
        setEnterDigit(true)
        setIsNotOk(false)
        onChange('')
    }


    const CompleteregistrationFrom = () => <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input disabled={isverify} type="password" className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="Password" />

        <div className='form-control' style={{ marginTop: '1em', marginBottom: '1em' }}>
            <PhoneInput
                inputClass='col'
                disabled={loading}
                country={'bi'}
                value={phone}
                onChange={e => {
                    // console.log(e.length)
                    setPhone(e)
                }}
            />
            <Alert
                message="Phone number verification"
                description={info}
                type={alertType}
            />
            {loading &&
                <a className='mt-2 mb-2 text-danger' onClick={handleChangeNumber}>
                    change Phone number ?
                </a>
            }
        </div>

        {enterDigit &&
            <>
                <div className='text-center mb-3'>
                    <h4>Verifiy number</h4>
                </div>
                <div className='text-center mb-3 row' style={{ justifyContent: 'center' }}>
                    <div className='col-12 col'>
                        <div className="input-group">
                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" autoFocus {...digits[0]} />

                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" {...digits[1]} />

                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" {...digits[2]} />

                            <span className="hyphen ml-1 mr-1" >
                                -
                            </span>

                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" {...digits[3]} />

                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" {...digits[4]} />

                            <input disabled={code} className='col text-center'
                                style={{ border: '2px solid #53b257' }} inputMode="decimal" {...digits[5]} />

                        </div>
                    </div>
                    {/* <pre>
                <code>"{value}"</code>
            </pre> */}
                </div>
            </>
        }
        {code &&
            <>
                <div className='text-center mb-3'>
                    <h4>Verifiy number</h4>
                </div>
                <div className='text-center mb-3 row' style={{ justifyContent: 'center' }}>
                    <LoadingOutlined />
                </div>
            </>
        }
        {isOk &&
            <>
                <div className='text-center mb-3'>
                    <h4>Verifiy number</h4>
                    <p className="text-success">Success <CheckOutlined /></p>
                </div>
            </>
        }

        {isNotOk &&
            <>
                <div className='text-center mb-3'>
                    <h4>Verifiy number</h4>
                    <p className="text-danger">Error <CloseOutlined /></p>
                </div>
                <div className='text-center mb-3'>
                    <Button onClick={handleTryAgain} type="primary" danger >
                        try again
                    </Button>
                </div>
            </>
        }

        {
            !loading &&
            <div className='text-center'>

                <Button disabled={loading} onClick={handleSubmit} type="primary" className="">
                    Complete Registeration
                </Button>

            </div>
        }

    </form>

    return (
        <>
            <div className="container p-3">
                <div className="row">
                    <div className="col-md-9 col offset-md-3">
                        <h4 className='text-center'>Complete Registration</h4>
                        {CompleteregistrationFrom()}
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default RegisteComplete;
