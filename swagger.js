const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
    info: {
        title: 'Task Mangement System API Docs',
        version: '1.0.0',
        description: 'This is the API documentation for The  Task Management-System',
        },
        servers: [
        {
            url: 'http://localhost:3000', // your base URL
        },
        ],
    },
    apis:['./routes/*.js']
}

const specs = swaggerJsdoc(options);

module.exports = specs;