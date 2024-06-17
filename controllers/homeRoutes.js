const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', { 
    logged_in: req.session.logged_in // Pass logged_in status to the template
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/profile', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('profile', {
    logged_in: req.session.logged_in
  });
});

module.exports = router;
