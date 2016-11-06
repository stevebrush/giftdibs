const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require(__dirname + '/middleware/routes');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const BUILD_PATH = 'dist';
const app = express();

// Express app
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', BUILD_PATH)));

app.use(session({
    secret: 'holdontoyourbutts',
    resave: false,
    saveUninitialized: false,
    //maxAge: 60000
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || '3000');
app.use('/', routes);

console.log("Executing server in " + environment + " mode.");

if (environment === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', BUILD_PATH, 'index.html'));
    });

} else {
    const webpack = require('webpack');
    const webpackConfig = require(path.join(__dirname, '../config/webpack.dev.config.js'));
    const compiler = webpack(webpackConfig);

    // Route webpack's resources
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));

    /**
     * Takes all requests and points them to the index.html file stored
     * in Webpack's server memory.
     * https://stackoverflow.com/questions/26845101/webpack-dev-middleware-does-not-compile-output-into-folder/39941763#39941763
     */
    app.use('/', function (req, res, next) {
        var filename;
        filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, function (err, result) {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err;
    err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(require(__dirname + '/middleware/error-handler'));

module.exports = app;
