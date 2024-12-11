const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./modules/category/routes/categoryRoutes");
const clubRoutes = require("./modules/clubs/Routes/clubRoutes");
const OrderRouter = require("./modules/order/Routes/OrderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Salom, Node.js va Express.js! PostgreSQL');
});
app.use("/category", categoryRoutes);
app.use('/club', clubRoutes)
app.use('/order', OrderRouter)
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda...`);
});


