import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles)