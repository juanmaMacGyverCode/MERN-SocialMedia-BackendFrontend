import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { hot } from 'react-hot-loader';

/*
Con esto envolvemos el componente MainRouter con ThemeProvider, cual daba acceso a Material-UI theme, 
y BrowserRouter. Las variables de tema personalizado que definimos previamente se pasan como PROP a 
ThemeProvider, haciendo que el tema esté disponible en todos nuestros componentes personalizados de 
React. Finalmente, en el archivo App.js, necesitamos exportar este componente de la aplicación para 
que se pueda importar y usar en main.js
*/
const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

/*
Marcar el componente como HOT es esencial para mantener el reloading de nuestros componentes REACT durante el desarrollo.
*/
export default hot(module) (App);