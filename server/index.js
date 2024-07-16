// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const next = require('next');

// const port = 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();
// const mongoose = require('mongoose');

// const bodyParser = require('body-parser');
// const path = require('path');

// const postsRoutes = require('../../server/routes/posts');
// const usersRoutes = require('../../server/routes/users');
// const commentsRoutes = require('../../server/routes/comments');
// const tagsRoutes = require('../../server/routes/tags');
// const HttpError = require('../../server/models/http-error');
// // const { cloudinaryConfig } = require('./config/cloudinary');
// // const { socket } = require('./config/socket');

// //to be added before the below middleware (first parse the body then reach the routes)
// app.use(bodyParser.json()); //parse and extract json data, calls next middleware

// mongoose
//   .connect(
//     'mongodb+srv://EknoorV2:Bsnldna-a211-1@cluster0.ynmnh.mongodb.net/medium?retryWrites=true&w=majority',
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then(() => {
//     console.log('Mongodb connected');
//   })
//   .catch((err) => console.log(err));

// nextApp.prepare().then(() => {
//   //all pages inside next are SSR => Make pages folder work
//   app.use('/api/posts', postsRoutes);

//   app.use('/api/users', () => console.log('users'));

//   app.use('/api/comments', commentsRoutes);

//   //route not attended by any of the above middlewares?
//   // app.use((req, res, next) => {
//   //   const error = new HttpError('Could not find the route', 404);
//   //   throw error;
//   // });

//   app.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   app.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });

// //attach 3 headers to the response to let the browser know it's okay
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); //which domains have access (here, any domain)
//   res.setHeader(
//     'Access-Control-Allow-Headers', //which headers incoming requests may have
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE'
//   ); //which HTTP methods may be used in requests
//   next(); //continue to other middlewares
// });

// // app.use("/api/tags", tagsRoutes);

// //error-handling middleware (run only on requests with error attached to them)
// // this 'special' (coz of the 4th arg) middleware on every request
// app.use((error, req, res, next) => {
//   //response already sent? => just forward the error as we can only send 1 response
//   if (res.headerSent) {
//     return next(error);
//   }
//   //does the error obj have a code property? If not, fall back to 500
//   res.status(error.code || 500);
//   //convention to attach a message to the error obj to show to the users
//   res.json({ message: error.message || 'An unknown error occurred' });
// });
