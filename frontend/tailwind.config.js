/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        primary: '#FF9800',  
        secondary: '#90A4AE',  
        tertiary: '#fb7185',   
      },
      // Gradientes personalizados 
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #FF9800 0%, #FF5722 100%)',  
        'secondary-gradient': 'linear-gradient(135deg, #90A4AE 0%, #B0BEC5 100%)', 
        'tertiary-gradient': 'linear-gradient(135deg, #fb7185 50%, #F8B3C2 100%)', 
      },
    },
  },
  plugins: [require("daisyui")],
};



