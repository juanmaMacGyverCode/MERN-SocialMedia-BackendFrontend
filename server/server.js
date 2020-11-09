import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

/*
Mongoose es una herramienta de modelado de objetos de MongoDB que proporciona una solución basada en 
esquemas para modelar datos de aplicaciones. Incluye conversión de tipos, validación, creación de consultas 
y enlaces de lógica empresarial integrados. El uso de Mongoose con esta pila de backend proporciona una capa 
superior a MongoDB con más funcionalidad, incluida la asignación de modelos de objetos a documentos 
de base de datos. Esto hace que sea más sencillo y productivo desarrollar con un servidor Node y MongoDB. 
Para obtener más información sobre Mongoose, visite mongoosejs.com.
*/

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

/* 
Con la aplicación Express configurada para aceptar solicitudes HTTP, podemos seguir adelante y 
usarla para implementar un servidor que pueda escuchar las solicitudes entrantes.
*/

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});
