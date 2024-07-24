import emailjs from '@emailjs/browser';

export const sendEmail = ({ to_email, subject, message }) => {
    emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);

    emailjs
        .send(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, {
            to_email,
            subject,
            message,
        })
        .then((response) => {
            console.log('Email sent successfully:', response);
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
        });
};
