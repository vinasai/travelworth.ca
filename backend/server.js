const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const packageRoutes = require("./routes/tourPackageRoutes");
const destinationRoutes = require('./routes/destinationRoutes');
const placeRoutes = require('./routes/placeRoutes');
const foodRoutes = require('./routes/foodRoutes');
const cultureRoutes = require('./routes/CultureRoutes');
const mustVisitPlaceRoutes = require('./routes/mustVisitPlaceRoutes');
const thingsToDoRoutes = require('./routes/thingsToDoRoutes');
const contactRoutes = require('./routes/contactRoutes');

const path = require('path');

const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://travelworth.ca', 'http://localhost:5000'],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));


// Session Configuration
app.use(session({
  secret: 'KP##2425', // Use a secure key
  resave: false,
  saveUninitialized: true,
  store: new MongoDBStore({
    uri: "mongodb://admin:flyplaces@159.89.121.226:27017/admin",
    collection: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    maxAge: 3600000 // 1 hour
  }
}));

app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

// Routes

app.use("/api/admin", adminRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/mustvisit', mustVisitPlaceRoutes);
app.use('/api/thingsToDo', thingsToDoRoutes);
app.use('/api/contacts', contactRoutes);



// Database Connection
mongoose.connect("mongodb://admin:flyplaces@159.89.121.226:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
