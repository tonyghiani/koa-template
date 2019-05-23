'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    NODE_ENV: joi.string().allow(['development', 'production', 'test']),
    PORT: joi.number(),
    API_VERSION: joi.number(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || 3000,
    apiVersion: envVars.API_VERSION || 'v1',
  },
};

module.exports = config;
