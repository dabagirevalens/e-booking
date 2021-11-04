import { loadStripe } from '@stripe/stripe-js'

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51JFOUzJt8PjGxb7vBnax4XXGVaMf9G78be5UMwj6EotdLe6mOOI6931bptYCxh0hh8ui6fsRHEXHU9u2nMNRiWEQ00GNPHuJFn');
    }

    return stripePromise;
}

export default getStripe;