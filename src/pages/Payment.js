import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'
import Footer from '../components/footer/footer'

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
    return (
        <>

            <div className="container p-5 mobileHidden text-center">
                <h4>Complete your purchase</h4>
                <Elements stripe={promise}>
                    <div className=" col-md-8 offset-md-2">
                        <StripeCheckout />
                    </div>
                </Elements>
            </div>

            <div className="container-fluid p-1    mobileVisible text-center">
                <h4>Complete your purchase</h4>
                <Elements stripe={promise}>
                    <div className="col-md-10 offset-md-2">
                        <StripeCheckout />
                    </div>
                </Elements>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default Payment
