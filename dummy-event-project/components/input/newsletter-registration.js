import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
    const emailInput = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();
        const email = emailInput.current.value;

        notificationCtx.showNotification({
            title: "Signing up...",
            message: "Regitering for newsletter",
            status: 'pending'
        })
        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                res.json().then(data => {
                    throw new Error(data.message || 'Something went wrong')
                })
            })
            .then(data => {
                notificationCtx.showNotification({
                    title: "Success",
                    message: "Successfully registered",
                    status: 'success'
                })
            })
            .catch(error => {
                notificationCtx.showNotification({
                    title: "Error",
                    message: error.message || 'Something went wrong',
                    status: 'error'
                })
            })
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInput}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
};

export default NewsletterRegistration;