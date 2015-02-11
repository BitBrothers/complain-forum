var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var User=require('../models/User,js');

//Initialise LocalStrategy and serialise, deserialize 

passport.use(new LocalStrategy(
    function(username,password,done){
        User.findOne({username:username}).exec(function(err,user){
            if(user)
                return done(null, user);
            else
                return done(null,false);
        }
        );
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
        if(user)
        return done(null, user);
      else
          return done(null, false);
  });
});

//Sign in with our own Local Username and Password. (That's what LocalStrategy means)