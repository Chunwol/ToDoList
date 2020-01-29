const express = require('express');
const todo = require('./todo');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect("/main");
});
//router.get('/main', (req, res) => res.render('main', { title: 'Express' }));
router.get('/login', (req, res) => res.render('login', { title: 'Express' }));
router.get('/signin', (req, res) => res.render('signin', { title: 'Express' }));
router.get('/main', todo.main_show);

router.post('/main/add/:id', todo.main_insert);
router.post('/main/del/:id', todo.main_delete);
router.post('/main/chack/:id', todo.main_finished_update);
router.post('/signin', todo.register);
router.post('/login', todo.login);

module.exports = router;
