const passport = require ('passport');
const User = require('./models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt-nodejs');

const cookieExtractor = req => {
	let token = null;
	if(req && req.cookies){
		token = req.cookies["access_token"];
	}
	return token;
}

passport.use(new JwtStrategy({
	//jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	jwtFromRequest: cookieExtractor,
	secretOrKey: "devRahil"
},(payload, done)=>{
	User.findById({_id: payload.sub},(err,user)=>{
		if(err){
			return done(err, false);
		}
		if(user){
			return done(null, user);
		}else{
			return done(null, false);
		}
	});
}));

passport.use('local.login',new LocalStrategy({
	usernameField : "email",
	passwordField : "password",
	passReqToCallback : true
},(req,email,password,done) => {
	
	User.findOne({email: req.body.email}, (err, user)=>{
        if(err) {
          console.log(err);
        }
		if(user){
			if(bcrypt.compareSync(password,user.password)){
				console.log("succes");
				return done(null,user);
			} else{
		   		return done(null,false,req.flash('error','Credentials not matched.'));
			}
			}
		else{
			return done(null,false,req.flash('error',"User doesn't exists."));
		}

	});
}));
