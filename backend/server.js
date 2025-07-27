import { connectDB } from "./src/config/db.js";
import { server } from "./src/app.js";


const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log("Failed to start the Server after connection"));
