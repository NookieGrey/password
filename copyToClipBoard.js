function copyToClipBoard(str) {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.value = str;
    input.style.position = 'fixed';
    input.style.zIndex = 1000000;
    input.style.opacity = 0;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}
