/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPrimary: "#FFFFFF",
        lightSecondary: "#F2F2F2",
        lightAccent: "#CCCCCC",
        lightGrayPrimary: "#333333",
        lightGraySecondary: "#666666",
        lightGrayAccent: "#CCCCCC",
      },
      backgroundColor: {
        lightPrimary: "#FFFFFF",
        lightSecondary: "#F2F2F2",
        lightAccent: "#CCCCCC",
        lightGrayPrimary: "#333333",
        lightGraySecondary: "#666666",
        lightGrayAccent: "#CCCCCC",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
