const express = require('express');
const todo = require('./todo');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//router.get('/main', (req, res) => res.render('main', { title: 'Express' }));
router.get('/login', (req, res) => res.render('login', { title: 'Express' }));
router.get('/signin', (req, res) => res.render('signin', { title: 'Express' }));
router.get('/main', todo.main_accesschack);


router.post('/signin', todo.register);
router.post('/login', todo.login);

module.exports = router;
