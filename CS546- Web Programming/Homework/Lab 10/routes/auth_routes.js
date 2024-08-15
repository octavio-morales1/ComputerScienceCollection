//import express, express router as shown in lecture code
import express from 'express';
import { registerUser, loginUser } from '../data/users.js';
const router = express.Router();

router.route('/').get(async (req, res) => {
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router.route('/register')
  .get(async (req, res) => {
    res.render('register', {layout:'main'});
  })
  .post(async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword, favoriteQuote,  themePreference,role}= req.body;
    try {
      if (!firstName) {
        throw 'First name must be provided';
      }
      if (!lastName) {
        throw 'Last name must be provided';
      }
      if (!username) {
        throw 'Username must be provided';
      }
      if (!password) {
        throw 'Password must be provided';
      }
      if (!confirmPassword) {
        throw 'Confirmation of password must be provided';
      }
      if (!favoriteQuote) {
        throw 'Favorite quote must be provided';
      }
      if (!themePreference) {
        throw 'Theme preference must be provided';
      }
      if (!role) {
        throw 'Role must be provided';
      }
      if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
        throw 'Invalid firstName. It should be a valid string and should be at least 2 characters long with a max of 25 characters.';
      }
      if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
        throw 'Invalid lastName. It should be a valid string and should be at least 2 characters long with a max of 25 characters.';
      }
      if (!/^[a-zA-Z]{5,10}$/.test(username)) {
        throw 'Invalid username. It should be a valid string and should be at least 5 characters long with a max of 10 characters.';
      }
      if (!/^(?!\s+$).{20,255}$/.test(favoriteQuote)) {
        throw 'Invalid favorite quote. It should be a valid string and should be at least 20 characters long with a limit of 255 characters.';
      }
      if (!['light', 'dark'].includes(themePreference.toLowerCase())) {
        throw 'Invalid theme preference. The ONLY two valid values are "light" or "dark".';
      }
      if (!['admin', 'user'].includes(role.toLowerCase())) {
        throw 'Invalid role. The ONLY two valid values are "admin" or "user".';
      }
      const pp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!pp.test(password)) {
        throw 'Invalid password. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
      }
      if (password != confirmPassword) {
        throw "Passwords do not match";
      }
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }
    try {
      const us= await registerUser( firstName, lastName, username, password, favoriteQuote, themePreference, role);
      if (us.signupCompleted) {
        res.render("login", { title: "Registration successful!" });
        res.redirect('/login');
      }
      else {
        res.status(500).render('register', { error: 'Internal server error during registration. This part makes everyone sad.', layout: 'main' });
      }
    }
    catch (error){
      res.status(400).render('register', { error: error.toString(), layout: 'main' });
    }
  });

router.route('/login')
  .get(async (req, res) => {
    res.render('login', { layout: 'main' });
  })
  .post(async (req, res) => {
    try {
      const us= await loginUser(req.body.username, req.body.password);
      if (us) {
        req.session.user= us;
        req.session.save(() => {
          if (us.role === 'admin') {
            res.redirect('/admin');
          }
          else {
            res.redirect('/user');
          }
        });
      }
      else {
        res.status(400).render('login', { error: 'Invalid username or password', layout: 'main' });
      }
    }
    catch (error) {
      res.status(400).render('login', { error: error.toString(), layout: 'main' });
    }
  });

router.route('/user').get(async (req, res) => {
  res.render('user', { ...req.session.user, layout: 'main', currentTime: new Date().toLocaleTimeString() });
});

router.route('/admin').get(async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).render('error', { error: 'Access Denied: Admins Only', layout: 'main' });
  }
  res.render('admin', { ...req.session.user, layout: 'main', currentTime: new Date().toLocaleTimeString(), admin:req.session.user.role == 'admin' });
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/login');
  });
});

export default router;