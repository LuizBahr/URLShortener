var express = require('express');
var router = express.Router();
const Link = require('../models/link');

router.get('/:code/result', async (req, res, next) => {
  const code = req.params.code;
  
  const resultado = await Link.findOne({where: {code}})

  if(!resultado) return res.sendStatus(404);

  res.render('result', resultado.dataValues);
})

router.get('/:code', async (req, res, next) => {
  const code = req.params.code;
  
  const resultado = await Link.findOne({where: {code}})

  if(!resultado) return res.sendStatus(404);

  resultado.hits++;
  await resultado.save();
  
  res.redirect(resultado.url);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/newUrl', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const resultado = await Link.create({
    url,
    code
  })

  res.render('result', resultado.dataValues);
})


module.exports = router;
