var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
        res.redirect("/questions");
    }else{
    res.render('index', { title: 'CodeRun' });
    }	
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'CodeRun' });
});

router.get('/questions', function(req, res, next) {
  res.render('questions', { title: 'CodeRun' });
});


router.post('/compile', function(req, res, next) {

var hackerEarth=require('hackerearth-node'); 
var hackerEarth=new hackerEarth('08a6ce1cd6f51b05546eea1746e066f2142365ba');

var source_code = req.body.he_code;
var uinput = req.body.uinput;
var lang = req.body.lang;


var config={};
config.time_limit=2;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source= source_code;  //your source code for which you want to use hackerEarth api
if( uinput ) {
config.input= uinput;
} else{
    config.input= "";
}  
//input against which you have to test your source code
config.language=lang; //optional choose any one of them or none


  hackerEarth.run(config,function(err,response){
        if(err) {
          res.send(err);
        } else {
          res.send(response);
        }
  });

});


// module.exports = router;



module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(error, user, info) {
        if (error) { return res.send(error); }
        if (!user) { return res.send(error); }
        req.logIn(user, function(error) {
            if (error) { return next(error); }
            return res.send('done');
        });
    })(req, res, next);
});

	/* Handle Registration POST */
	router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(error, user, info) {
        if (error) { return res.send(error); }
        if (!user) { return res.send(error); }
        req.logIn(user, function(error) {
            if (error) { return next(error); }
            return res.send('done');
        });
    })(req, res, next);
});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}




