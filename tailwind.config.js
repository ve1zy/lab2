module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)"
        },
        button: {
          background1: "var(--button-bg-1)",
          text1: "var(--button-text-1)"
        },
        edittext: {
          border1: "var(--edittext-border-1)",
          background1: "var(--edittext-bg-1)"
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};