import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import path from 'path';

/*
- body-parser: Solicite el middleware de análisis del cuerpo para manejar las complejidades del análisis 
de los objetos de solicitud que se pueden transmitir, de modo que podamos simplificar la comunicación 
entre el navegador y el servidor intercambiando JSON en el cuerpo de la solicitud. 
Para instalar el módulo, ejecute "yarn add body-parser" desde la línea de comando. 
Luego, configure la aplicación Express con bodyParser.json() y bodyParser.urlencoded({ extended: true }).

- cookie-parser: Middleware de análisis de cookies para analizar y establecer cookies en objetos de solicitud. 
Para instalar el módulo cookie-parser, ejecute "yarn add cookie-parser" desde la línea de comandos.

- compress: Middleware de compresión que intentará comprimir los cuerpos de respuesta para todas las 
solicitudes que atraviesan el middleware. Para instalar el módulo de compresión, 
ejecute "yarn add compress" desde la línea de comando.

- helmet: Colección de funciones de middleware para ayudar a proteger las aplicaciones Express mediante 
la configuración de varios encabezados HTTP. Para instalar el módulo de casco, ejecute "yarn add helmet" 
desde la línea de comando.

- cors: Middleware para permitir el intercambio de recursos entre orígenes (CORS). 
Para instalar el módulo cors, ejecute "yarn add cors" desde la línea de comando.
*/

const CURRENT_WORKING_DIR = process.cwd();
const app = express();
/*
Express añadirá codigo importado del middleware desde el client-side webpack. Iniciará la compilación
de Webpack y empaquetará el client-side y también habilita el hot reloading.
*/
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

/*
Para asegurarnos de que el servidor EXPRESS maneja correctamente las solicitudes de archivos estáticos 
como archivos CSS, imágenes o el JS del lado del cliente incluido, lo configuraremos para que sirva 
archivos estáticos desde la carpeta DIST agregando la siguiente configuración en EXPRESS.JS

Con esta configuración, cuando EXPRESS reciba una petición en una ruta con /dist, sabremos ver que el 
recurso estático pedido en el dist folder antes de devolver el recurso en la response. Ahora podremos 
cargarlo en dist.
*/
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

/*
Endpoint de controlador
*/

app.get('/', (req, res) => {
    res.status(200).send(Template());
});

/*
// Catch unauthorised errors
*/
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "message": err.name + ": " + err.message });
    } else if (err) {
        res.status(400).json({ "message": err.name + ": " + err.message });
        console.log(err);
    }
});

export default app;