/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#0F0F11',
                'selected-note': '#1A1C22',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                '2xs': '0.65rem',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
    variants: {
        scrollbar: ['rounded'],
    },
};
