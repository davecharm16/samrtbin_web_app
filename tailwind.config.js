/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#191919',
                    secondary: '#e81900',
                    accent: '#b90000',
                    neutral: '#111006',
                    'base-100': '#fafafa',
                    info: '#00cbff',
                    success: '#00da9c',
                    warning: '#ffd800',
                    error: '#c81f40',
                },
            },
        ],
    },
    plugins: [daisyui],
};
