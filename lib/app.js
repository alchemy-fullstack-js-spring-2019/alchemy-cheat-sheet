const express = require('express');
const mongoConnection = require('./middleware/mongo-connection');
const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));
app.use('/api/v1/topics', mongoConnection, require('./routes/topics'));
app.use('/api/v1/notes', mongoConnection, require('./routes/notes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
