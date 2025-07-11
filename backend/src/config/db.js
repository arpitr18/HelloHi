import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log(
      `✅ Connection to database has been succesfull by ${conn.connection.host}`
    );
  } catch (err) {
    console.log(`❌ Database connection Failed `);
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
