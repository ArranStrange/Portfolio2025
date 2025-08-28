/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "monospace"],
        inter: ["Inter", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
      },
      colors: {
        charcoal: "#1a1a1a",
        "warm-white": "#f8f8f2",
        rustic: {
          orange: "#d97706",
          gold: "#fbbf24",
          olive: "#84cc16",
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        typewriter: "typewriter 2s steps(40) 1s 1 normal both",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 10%)" },
          "80%": { transform: "translate(3%, 15%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        typewriter: {
          to: { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      components: {
        card: {
          base: "backdrop-blur-sm border-4 border-warm-white/30 rounded-lg",
          variants: {
            size: {
              sm: "p-4 md:p-6",
              md: "p-6 md:p-8",
              lg: "p-8 md:p-10 lg:p-12",
            },
            variant: {
              default: "border-warm-white/30",
              accent: "border-rustic-gold/40",
              subtle: "border-warm-white/20",
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents, theme }) {
      addComponents({
        ".card": {
          "@apply backdrop-blur-sm border-4 border-warm-white/30 rounded-lg":
            {},
        },
        ".card-sm": {
          "@apply card p-4 md:p-6": {},
        },
        ".card-md": {
          "@apply card p-6 md:p-8": {},
        },
        ".card-lg": {
          "@apply card p-8 md:p-10 lg:p-12": {},
        },
        ".card-accent": {
          "@apply card border-rustic-gold/40": {},
        },
        ".card-subtle": {
          "@apply card border-warm-white/20": {},
        },
      });
    },
  ],
};
