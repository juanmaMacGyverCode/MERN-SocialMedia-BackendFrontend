/*
env: Diferenciar entre modos de desarrollo y producción.
port: Para definir el puerto de escucha del servidor
jwtSecret: La clave secreta que se utilizará para firmar JWT
mongoUri: La ubicación de la instancia de la base de datos MongoDB para el proyecto
*/
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/mernproject'
  }
  
  export default config