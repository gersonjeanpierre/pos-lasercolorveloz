
export const EnvConfigation = () => ({

  environment: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  port: process.env.PORT,
  hostApi: process.env.HOST_API,
  jwtSecret: process.env.JWT_SECRET

});