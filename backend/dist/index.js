import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// connnection and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server Opened on Port 5000 and Connected to Database'));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map