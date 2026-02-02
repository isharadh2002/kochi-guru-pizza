import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGO_DB_URI, FRONTEND_URL } = process.env;

const config = {
  PORT: PORT || 5000,
  MONGO_DB_URI: MONGO_DB_URI,
  FRONTEND_URL: FRONTEND_URL
};

export default config;
