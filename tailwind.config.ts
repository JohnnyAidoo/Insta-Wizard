const withMT = require("@material-tailwind/react/utils/withMT");
import { withUt } from "uploadthing/tw";

module.exports = withMT(
  withUt({
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "rgba(var(--primary))",
          primary2: "rgba(var(--primary2))",
          secondary: "rgba(var(--secondary))",
          tertiary: "rgba(var(--tertiary))",
          tertiary2: "rgba(var(--tertiary2))",
        },
      },
    },
    plugins: [],
  })
);
