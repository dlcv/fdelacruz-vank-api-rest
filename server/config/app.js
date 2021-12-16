require('dotenv').config();

// APPLICATION PORT
process.env.APP_PORT = process.env.APP_PORT || 3000;

// ENVIRONMENT
process.env.APP_ENV = process.env.APP_ENV || 'dev';

// TOKEN EXPIRATION
process.env.TOKEN_EXPIRATION = 60 * 60 * 24;

// SERVER TOKEN SEED
process.env.SERVER_TOKEN_SEED = process.env.SERVER_TOKEN_SEED || 'dev-token-seed';

// SERVER API KEY
process.env.SERVER_API_KEY = process.env.SERVER_API_KEY || 'dev-api-key';