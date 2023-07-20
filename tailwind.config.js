/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#3699FF',
                'green-light': '#1DC894',
                bg: '#F5F5F5',
                'bg-input': '#F5F8FA',
                'status-planning': '#E8FFF3',
                'status-finished': '#e2f6ff',
                'status-inprogess': '#FFF8DD',
                danger: '#F1416C',
            },
        },
    },
    plugins: [],
};
