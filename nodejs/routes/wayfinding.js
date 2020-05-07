var express = require('express');
var router = express.Router();
var path=require('path');

/* GET login page. */
router.get('/public/RouteAnalyser', function(req, res, next) {
  res.render(path.resolve('public/RouteAnalyser/RouteAnalyser/routeAnalysis.html'))
});

module.exports = router;