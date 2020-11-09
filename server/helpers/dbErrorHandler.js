/*
Los errores que no se produzcan debido a una infracción del validador de Mongoose contendrán un código 
de error asociado. En algunos casos, estos errores deben manejarse de manera diferente. 
Por ejemplo, los errores causados por una violación de la restricción única devolverán un objeto 
de error que es diferente de los errores de validación de Mongoose. La opción única no es un validador, 
sino un ayudante conveniente para construir índices únicos de MongoDB, por lo que agregaremos otro método 
getUniqueErrorMessage para analizar el objeto de error relacionado con la restricción única y construir 
un mensaje de error apropiado.
*/

const getUniqueErrorMessage = (err) => {
    let output;
    try {
        let fieldName =
            err.message.substring(err.message.lastIndexOf('.$') + 2,
                err.message.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    } catch (ex) {
        output = 'Unique field already exists';
    }
    return output;
}


/*
Este método analizará y devolverá el mensaje de error asociado con el error de validación específico 
u otros errores que pueden ocurrir al consultar MongoDB usando Mongoose.
*/

const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;
}

export default { getErrorMessage }