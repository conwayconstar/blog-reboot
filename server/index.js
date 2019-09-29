const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');

const app = express();

// Init body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production';

function start() {
  // Connect Mongoose
  mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(async () => {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  })
    .catch(err => console.error(err.message));
}
start();
