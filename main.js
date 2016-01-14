var masterPassword = 'password';
var data = createPassword();

var crypter = new Crypto(masterPassword);

crypter.encript(data)
    .then(crypter.decrypt)
    .then(console.log.bind(console));