import { signout } from "./api-auth";

const auth = {
    /*
    Recuperando las credenciales.
    Necesitamos recuperar las credenciales guardadas para comprobar si un usuario está registrado. En el método, podemos
    recuperar aquellas credenciales desde sessionStorage. Una llamada de isAuthenticated() devolverá alguna de las credenciales almacenadas
    o false, dependiendo de la credencial encontrada en sessionStorage.
    */
    isAuthenticated() {
        if (typeof window == "undefined") {
            return false;
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'));
        } else {
            return false;
        }
    },
    /*
    Guardar credenciales.
    Este método toma las credenciales de JWT, y devuelve la llamada, cb, como argumento. Guarda las credenciales en sessionStorage
    despues de asegurar window esta definida, en otras palabras, asegura este codigo esta ejecutando en un buscador y 
    por lo tanto tiene acceso a sessionStorage.
    */
    authenticate(jwt, cb) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        }
        cb();
    },
    /*
    Borrando credenciales.
    Cuando un usuario cierra sesión correctamente en la aplicación, queremos borrar las credenciales JWT 
    almacenadas de sessionStorage. Esto se puede lograr llamando al método clearJWT, que se define en el 
    siguiente código.
    Este método clearJWT toma una función de devolución de llamada como argumento y elimina la credencial 
    JWT de sessionStorage. La función cb () pasada permite que el componente que inicia la función de cierre 
    de sesión dicte lo que debe suceder después de un cierre de sesión exitoso.
    El método clearJWT también usa el método de cierre de sesión que definimos anteriormente en api-auth.js 
    para llamar a la API de cierre de sesión en el backend. Si hubiéramos utilizado cookies para almacenar 
    las credenciales en lugar de sessionStorage, la respuesta a esta llamada de API sería donde borramos la 
    cookie, como se muestra en el código anterior. El uso de la llamada a la API de cierre de sesión es 
    opcional, ya que depende de si se utilizan cookies como mecanismo de almacenamiento de credenciales.
    */
    clearJWT(cb) {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem('jwt');
        }
        cb();
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        });
    }
}