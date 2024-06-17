const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helper');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Import the User model
const { User } = require('./Models');

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: 'Invalid email or password.' });
      return;
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid email or password.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id; // Set session user_id
      req.session.logged_in = true;  // Set session logged_in flag
      res.status(200).json({ message: 'Logged in successfully!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
app.post('/api/users/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Failed to log out.');
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(404).end();
  }
});

// Define a route to render the homepage
app.get('/', (req, res) => {
  res.render('homepage', { 
    logged_in: req.session.logged_in // Pass logged_in status to the template
  });
});

// Define a route to handle form submission
app.post('/submit', (req, res) => {
  const { categories, difficulty, type } = req.body;
  // Handle form data here
  res.send(`Categories: ${categories}, Difficulty: ${difficulty}, Type: ${type}`);
});

// Use routes defined in the controllers directory
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
