const router = require('express').Router();
const { User } = require('../../Models');

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(400).json({ error: 'An error occurred during signup' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });

  try {
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user);

    if (!user) {
      res.status(400).json({ message: 'Invalid email or password.' });
      return;
    }

    const validPassword = await user.checkPassword(password);
    console.log('Password valid:', validPassword);

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
    console.error('Error during login:', err); // Enhanced logging
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// Logout a user
router.post('/logout', (req, res) => {
  console.log('Logout request received');

  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        console.error('Error during logout:', err); // Enhanced logging
        res.status(500).send('Failed to log out.');
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
