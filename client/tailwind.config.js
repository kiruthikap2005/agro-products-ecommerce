/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'agro-green': '#4CAF50',
                'agro-dark': '#2E7D32',
                'agro-light': '#81C784',
            },
        },
    },
    plugins: [],
}
