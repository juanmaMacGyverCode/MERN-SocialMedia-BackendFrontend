import mongoose from 'mongoose';
import crypto from 'crypto';

/*
La función mongoose.Schema () toma un objeto de definición de esquema como parámetro para generar un nuevo 
objeto de esquema Mongoose que especificará las propiedades o la estructura de cada documento en una colección. 
Discutiremos esta definición de esquema para la colección de usuarios antes de agregar cualquier código de 
lógica empresarial para completar el modelo de usuario.
*/

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

/*
La contraseña no se guarda directamente en BBDD. Cuando se recibe el valor de la contraseña en la creación o 
actualización del usuario, se cifra en un nuevo valor hash y se establece en el campo hashed_password, 
junto con el valor de sal único en el campo de salt.
*/

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/*
Para agregar restricciones de validación a la cadena de contraseña real seleccionada por el usuario final, 
debemos agregar una lógica de validación personalizada y asociarla con el campo hashed_password en el esquema.

Mantendremos los criterios de validación de contraseña simples en nuestra aplicación y nos aseguraremos de 
que se proporcione un valor de contraseña y tenga una longitud de al menos seis caracteres cuando se cree 
un nuevo usuario o se actualice una contraseña existente. Logramos esto agregando una validación personalizada 
para verificar el valor de la contraseña antes de que Mongoose intente almacenar el valor hashed_password. 
Si la validación falla, la lógica devolverá el mensaje de error correspondiente.
*/

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required ' + this._password);
    }
}, null);

/*
La lógica de cifrado y la lógica de generación de sal, que se utilizan para generar los valores 
hashed_password y salt que representan el valor de la contraseña, se definen como métodos UserSchema.

Los métodos UserSchema se pueden utilizar para proporcionar la siguiente funcionalidad:

- authenticate: este método se llama para verificar los intentos de inicio de sesión haciendo coincidir el 
texto de la contraseña proporcionada por el usuario con la contraseña hash almacenada en la base de datos para un usuario específico.

- encryptPassword: este método se utiliza para generar un hash cifrado a partir de la contraseña de texto 
sin formato y un valor de sal único utilizando el módulo criptográfico de Node.

- makeSalt: este método genera un valor de sal único y aleatorio utilizando la marca de tiempo actual en 
la ejecución y Math.random().

Los algoritmos de hash generan el mismo hash para el mismo valor de entrada. Pero para garantizar que 
dos usuarios no terminen con la misma contraseña hash si usan el mismo texto de contraseña, 
emparejamos cada contraseña con un valor de sal único antes de generar la contraseña hash para cada usuario. 
Esto también hará que sea difícil adivinar el algoritmo de hash que se está utilizando porque la misma 
entrada del usuario aparentemente genera diferentes hashes.
*/

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}

export default mongoose.model('User', UserSchema);