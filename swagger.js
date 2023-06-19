const swaggerAutogen = require('swagger-autogen')();


const outputFile = './swagger_output.json';
const authRoutes =["./routes/authRoutes.js"]

const doc = {
  info: {
    title: 'API documentations',
    description: 'API documentation',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  basePath: '/auth',
  schemes: ['http'], 
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen(outputFile, authRoutes, doc);
