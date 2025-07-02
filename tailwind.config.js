/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main_color)",
        mainWeak: "var(--main_color_weak)",
        cardBg: "var(--card_bg)",
        bodyBg: "var(--body_bg)",
        text: "var(--text_color)",
        textWeak: "var(--text_color_weak)",
        lines: "var(--lines_color)",
        red: "var(--red)",
        redWeak: "var(--red_weak)",
        green: "var(--green)",
        greenWeak: "var(--green_weak)",
      },
    },
  },
  plugins: [],
};
