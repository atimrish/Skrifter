/** @types {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,jsx,tsx}",
        "./index.html",
    ],
    theme: {
        extend: {},
        fontFamily: {
            'mono': ['FiraMono', 'sans-serif'],
            'main': ['NevermindCompact', 'sans-serif'],
        },
        colors: {
            'gray': '#B9B9B9',
            'blue': '#56A1D8',
            'red': '#FF0000',
            'light-gray': '#D9D9D9',
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'dark-gray': '#575757',
            'black': '#161619',
            'yellow': '#EBD1AE'
        }
    },
    plugins: [],
}