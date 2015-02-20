var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
			clientID: '2ee8730abb67d45ecb23',
			clientSecret: '513c805a78b921ac0aa84f18cb9d066be23ec843',
			callbackURL: 'http://localhost:3000/auth/github/callback'
		},function(accessToken, refreshToken, profile, done) {
			console.log(profile)
			Usuario.findOrCreate(
				{ "login" : profile.username},
				{ "nome" : profile.username},
				function(erro, usuario) {
					if(erro){
						console.log(erro);
						return done(erro);
					}
					return done(null, usuario);
				}
			);
		})
	);
	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};