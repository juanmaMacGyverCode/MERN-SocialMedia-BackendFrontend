import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

/*
Ayudamos a nuestros componentes React personalizados con las rutas o locations en la aplicación. 
Añadimos solo en esta versión uno en root route para renderizar el componente HOME. 
Como desarrollaremos más componente de vistas, modificaremos el MainRouter y añadiremos rutas 
para el nuevo componente dentro de componente SWITCH
*/
const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    );
}
export default MainRouter;