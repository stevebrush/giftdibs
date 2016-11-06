const app = require('./server/app');
const passport = require('passport');
const database = require(__dirname + '/server/database');
const User = require(__dirname + '/server/database/models/user');

// Database
database.connect(function (uri) {
    console.log('Database connected to ' + uri);
});

// Configure authentication strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Start server
app.listen(app.get('port'), function () {
    console.log(`Listening on http://localhost:` + app.get('port') + `...`);
});
