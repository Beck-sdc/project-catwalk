const express = require('express');
const productsRouter = require('./routers/productsRouter.js');
const reviewsRouter = require('./routers/reviewsRouter.js');
const qaRouter = require('./routers/qaRouter.js');
const cartRouter = require('./routers/cartRouter.js');
const interactionsRouter = require('./routers/interactionsRouter.js');

const app = express();

const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);
app.use('/qa', qaRouter);
app.use('/cart', cartRouter);
app.use('/interactions', interactionsRouter);

// app.get('/', (req, res) => {
//   res.send('hello world');
// })
// app.get('/products/:product_id', (req, res) => {
//   res.sendFile('../client/dist/index.html', { root: __dirname });
// });
// app.use('/products/:product_id', express.static(__dirname + '/../client/dist'));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
})