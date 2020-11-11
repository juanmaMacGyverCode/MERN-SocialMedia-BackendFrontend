import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logoPrueba from './../assets/images/logoPrueba.png';

/*
Para cada componente de React, necesitamos importar las librerias, modulos y ficheros que vayan a ser usados. Suelen ser
los React, CSS, Material-UI, React Router modules, images, CSS, API fetch y los auth helpers.
*/

/*
Esto es objetos de estilo JSS, y aqui injectaremos dentro del componente usando el hook devuelto por makeStyles.
El makeStyles hook API toma una función como un argumento y da acceso a nuestra variable de tema personalizado.
Más información en http://cssinjs.org/ y en https://material-ui.com y también en reactjs.org/docs/hooks-intro.html
*/
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}));

/*
Esto es lo que se ve en la WEB
*/
export default function Home() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={logoPrueba} title="Logo de prueba"/>
            <CardContent>
            <Typography variant="body2" component="p">
                Welcome to the MERN Skeleton home page.
            </Typography>
            </CardContent>
        </Card>
    );
}