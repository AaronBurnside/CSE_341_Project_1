const swaggerAutogen = require('swagger-autogen')();

const doc = {

    info: {
        title: "contacts Api",
        description: "contacts Api"
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
