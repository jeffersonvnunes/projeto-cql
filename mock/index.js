const axios = require('axios');

document.write('Loading...');

var newUser = {
    'name': 'Jason',
    'age': 20
};

var PATH = 'http://localhost:3000/usuariosExternos';

/**
 * UM comentario
 */
axios.get(PATH)
    .then(function(resp) {
        document.write('<span style="color: green">Successful!</span>');
        console.log(resp.data);
    })
    .catch(function(error) {
        console.error(error);
    });
