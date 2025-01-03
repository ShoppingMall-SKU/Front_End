/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
   content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
   theme: {
      extend: {
         colors: {
            "base-color": "#FF766E",
         },
      },
   },
   plugins: [require("daisyui")],
};
