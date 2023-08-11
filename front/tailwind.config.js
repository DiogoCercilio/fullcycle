import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-select/dist/index.esm.js"],
  theme: {
    extend: {},
  },
  plugins: [],
});
