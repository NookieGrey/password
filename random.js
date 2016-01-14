function createPassword() {
    var PASSWORD_LENGTH = 16;

    var random = Math.random;
    var allowedChars = getAllowedCharsArr();

    for (var password = "", i = 0; i < PASSWORD_LENGTH; i++) {
        var randomIndex = Math.floor(random() * allowedChars.length);
        password += allowedChars[randomIndex]
    }

    return password;

    function getAllowedCharsArr() {
        var FIRST_ALLOWED_ASCII_CHAR_INDEX = 32;
        var ALLOWED_CHARS_COUNT = 95;

        for (var allowedChars = [], i = 0; i < ALLOWED_CHARS_COUNT; i++) {
            var asciiCode = FIRST_ALLOWED_ASCII_CHAR_INDEX + i;
            var char = String.fromCharCode(asciiCode);
            allowedChars.push(char)
        }

        return allowedChars;
    }
}

