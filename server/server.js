require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const connectDB = require("./utils/db");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middlewares/error-middleware");
const campusInfoRoute = require("./router/campusInfo-router");
const adminRoute = require("./router/admin-router");
const CampusInfo = require("./models/campusInfo-model");

// let's tackle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

//Mount the Router: To use the router in your main Express App, you can mount it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", campusInfoRoute);

//let's define admin route
app.use("/api/admin", adminRoute);
app.post('/admin/campusInfo/add', (req, res) => {
    // Your logic to add campus info to the database
    CampusInfo.create(req.body);
    res.status(200).json({ message: 'Campus info added successfully' });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});