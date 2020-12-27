/*
Aqui hay 5 métodos helpers para consumir API.
*/

/* 
Este método toma los datos del user de el componente de la vista, el cual donde invoca al método.
Entonces fetcheamos como POST en la ruta especificada para crear un usuario nuevo en el backend.
Finalmente devolvemos una respuesta del servidor como una promesa.
*/
const create = async (user) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

/*
Devuelve tras la promesa, si es satisfactorio, una lista de usuarios como array.
*/
const list = async (signal) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

/*
El JWT está adjunto a la llamda GET en Authorization header usando el esquema Bearer. Esta promesa, cuando resuelve, 
ambos devolverán el componente de los detalles del usuario específico o notificará el acceso restringido a autenticación.
*/

const read = async (params, credentials, signal) => {
    try{
        let response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

/*
Lo mismo que el anterior, solo que updatea en caso de tener las credenciales en regla.
*/

const update = async (params, credentials, user) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

/*
Lo mismo que lo anterior.
*/

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

export {create, list, read, update, remove}