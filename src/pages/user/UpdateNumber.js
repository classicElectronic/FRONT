import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import { Alert, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Cryptr from 'cryptr'
import useDigitInput from 'react-digit-input';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { createOrUpdateUser } from '../../functions/auth'
import { useHistory } from 'react-router-dom'

const cryptr = new Cryptr('classic');

const UpdateNumber = () => {

    let { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    let history = useHistory();

    const [change, setChange] = useState(true)
    const [code, setCode] = useState(false)
    const [enterDigit, setEnterDigit] = useState(false)
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('The Phone number will be used when contacting you on Whatsapp')
    const [alertType, setAlertType] = useState('info')
    const [value, onChange] = useState('');
    const digits = useDigitInput({
        acceptedCharacters: /^[0-9]$/,
        length: 6,
        value,
        onChange,
    });
    const [isOk, setIsOk] = useState(false)
    const [isNotOk, setIsNotOk] = useState(false)

    let lastDigit = digits[5].value

    useEffect(() => {
        setPhone(user.number)
    }, [])


    useEffect(() => {
        // console.log(lastDigit);
        if (lastDigit) {
            setCode(true)
            // console.log('code', value)
            setEnterDigit(false)

            checkDigits()
        }
    }, [value])

    const updateNewNumber = () => {
        window.localStorage.removeItem('verificationDigit');

        createOrUpdateUser(user.token, `+${phone}`)
            .then(res => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        number: res.data.number,
                        token: user.token,
                        role: res.data.role,
                        _id: res.data._id,
                    },
                });
            })
            .catch((err) => console.log(err));

        // redirect
        history.push('/');
    }


    const checkDigits = () => {
        const getEncryptedDigit = window.localStorage.getItem('verificationDigit')
        const decryptedDigit = cryptr.decrypt(getEncryptedDigit);
        console.log(decryptedDigit);
        if (decryptedDigit === value) {
            // alert('ok')
            setCode(false)
            setIsOk(true)
            updateNewNumber()
        } else {
            // alert('not ok')
            setCode(false)
            setIsNotOk(true)
        }
    }

    const handleChangeNumber = (e) => {
        e.preventDefault()
        setChange(false)
        setEnterDigit(false)
        setInfo('The Phone number will be used when contacting you on Whatsapp')
        setAlertType('info')
    }

    const handleNewNumber = (e) => {
        e.preventDefault()
        setEnterDigit(true)
        setChange(true)
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

    return (
        <>
            <div className='container mt-4'>
                <div className='row justify-content-around'>
                    <div className='col-9'>
                        <form>
                            <div className='form-control'>
                                <div className='row'>
                                    <div className='col-9 col'>
                                        <PhoneInput
                                            inputClass='col'
                                            disabled={change}
                                            country={'bi'}
                                            value={phone}
                                            onChange={e => {
                                                // console.log(e.length)
                                                setPhone(e)
                                            }}
                                        />
                                    </div>
                                    {!change &&
                                        <div className='col-3 col '
                                            style={{ alignSelf: 'end' }}>
                                            <Button type='primary'
                                                onClick={handleNewNumber}
                                                danger>
                                                Change
                                            </Button>
                                        </div>
                                    }
                                </div>
                                <Alert
                                    message="Phone number"
                                    description={info}
                                    type={alertType}
                                />
                                <a className='mt-2 mb-2 text-danger' onClick={handleChangeNumber}>
                                    change Phone number ?
                                </a>
                            </div>
                            {enterDigit &&
                                <>
                                    <div className='text-center mb-3'>
                                        <h4>Verifiy number</h4>
                                    </div>
                                    <div className='text-center mb-3 row' style={{ justifyContent: 'center' }}>
                                        <div className='col-9 col'>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNumber
