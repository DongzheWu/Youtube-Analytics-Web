const passport = require('passport');

module.exports = (app) => {

    //log in
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    //Callback after the user log in
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/');
        }
    );
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    //Check if the user has logged in already
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};