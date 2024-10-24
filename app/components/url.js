const MainURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://insta-wizard.vercel.app";

export default MainURL;
