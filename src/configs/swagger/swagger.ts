import { exit } from 'process'
import { port, url } from '../..'
import swaggerAutogen from 'swagger-autogen'

const outputFile = '../swagger/swagger_output.json'
const endpointsFiles = ['../../routes/api']

let host = ""

if (url != "") {
  host = url.split("//")[1];
} else {
  host = `${url.split("//")[1]}:${port}`;
}

const doc = {
  info: {
    title: 'PIGPAY API Documentation',
    version: '1.0.0',
    description: '',
    contact: { name: 'Armando Pereira' }
  },
  host,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token Authorization'
    }
  }
}

swaggerAutogen({ language: 'pt-BR' })(outputFile, endpointsFiles, doc).then(() => exit())
