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
   daisyui: {
      themes: ["light"], // 다크 모드 비활성화를 위해 'light' 테마만 적용
    },
   plugins: [require("daisyui")],
};
