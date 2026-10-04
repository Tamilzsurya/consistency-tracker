const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');

const userRoutes = require('./routes/userRoutes')
const habitRoutes = require('./routes/habitRoutes')
const entryRoutes = require('./routes/entryRoutes')
const authRoutes = require('./routes/authRoutes')

const errorMiddleware = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: `${process.env.CLIENT_URL}`,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
))
app.use(passport.initialize())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)
app.use('/api/entries', entryRoutes)


// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Consistency backend is running"
    });
});




// Error middleware
app.use(errorMiddleware)

module.exports = app;