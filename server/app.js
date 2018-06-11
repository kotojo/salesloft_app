// setup and configuration style of this application was inspired/copied from thinkster's realworld project
// https://github.com/gothinkster/node-express-realworld-example-app/

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// request logging
app.use(morgan('dev'));

// parse json or urlencoded html bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
