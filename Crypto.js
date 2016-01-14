function Crypto(masterPassword) {
    var crypto = window.crypto || window.msCrypto;
    var subtle = crypto.subtle;

    this.encript = function (data) {
        var vector = crypto.getRandomValues(new Uint8Array(16));

        return getKey(masterPassword)
            .then(encrypt(data, vector)) //returns encryptedData buffer
            .then(arrayBufferToString)
            .then(String.prototype.concat.bind(arrayBufferToString(vector))) // vector + encriptedData
            ;


        function encrypt(data, vector) {
            return function (key) {
                return subtle.encrypt({name: "AES-CBC", iv: vector}, key, stringToArrayBuffer(data));
            }
        }
    };

    this.decrypt = function (encrypted) {

        return getKey(masterPassword)
            .then(decrypt(encrypted))
            .then(arrayBufferToString);

        function decrypt(encrypted) {
            var vector = stringToArrayBuffer(encrypted.slice(0, 16));
            var data = stringToArrayBuffer(encrypted.slice(16));

            return function (key) {
                return subtle.decrypt({name: "AES-CBC", iv: vector}, key, data)
            }
        }
    };

    function getKey(masterPassword) {
        return getHash(masterPassword)
            .then(hashToKey);

        function getHash(masterPassword) {
            return subtle.digest({name: "SHA-256"}, stringToArrayBuffer(masterPassword))
        }

        function hashToKey(hash) {
            return subtle.importKey("raw", hash, {name: "AES-CBC"}, false, ["encrypt", "decrypt"])
        }
    }

    function arrayBufferToString(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    function stringToArrayBuffer(str) {
        return new Uint8Array(Array.apply('', Array(str.length))
            .map(Function.prototype.call, ''.charCodeAt.bind(str)));
    }
}

//Passphrase Based Encryption using Web Cryptography API
//http://qnimate.com/passphrase-based-encryption-using-web-cryptography-api/

//How to convert ArrayBuffer to and from String
//https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String?hl=en

//SubtleCrypto
//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

//Promise
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise

//Вы опасно некомпетентны в криптографии
//http://habrahabr.ru/post/181372/