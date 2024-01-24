import swaggerAutogen from 'swagger-autogen'

const outputFile = '../swagger/swagger_output.json'
const endpointsFiles = ['../../routes/api']

const port = process.env.SERVER_PORT || 3000

const doc = {
  info: {
    title: 'PIGPAY API Documentation',
    version: '1.0.0',
    description: '',
    contact: { name: 'Armando Pereira' }
  },
  host: `localhost:${port}`,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
}

swaggerAutogen({ language: 'pt-BR' })(outputFile, endpointsFiles, doc)
