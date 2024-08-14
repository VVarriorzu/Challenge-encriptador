document.getElementById('botonEncriptar').addEventListener('click', function() {
    let textoEntrada = document.getElementById('textoEntrada').value;
    
    // Validación: No permite encriptar mayúsculas o caracteres especiales
    if (/[^a-z\s]/.test(textoEntrada)) {
        mostrarAlerta("No se permiten mayúsculas ni caracteres especiales", true);
        return;
    }

    let textoEncriptado = CryptoJS.AES.encrypt(textoEntrada, "secreta").toString();
    document.getElementById('textoSalida').value = textoEncriptado;
    mostrarAlerta("Texto encriptado");
});

document.getElementById('botonDesencriptar').addEventListener('click', function() {
    let textoEntrada = document.getElementById('textoEntrada').value;

    if (textoEntrada.trim() === "") {
        alert("Por favor, ingresa el texto cifrado.");
        return;
    }

    try {
        let textoDesencriptado = CryptoJS.AES.decrypt(textoEntrada, "secreta").toString(CryptoJS.enc.Utf8);
        if (textoDesencriptado) {
            document.getElementById('textoSalida').value = textoDesencriptado;
            mostrarAlerta("Texto desencriptado");
        } else {
            alert("Texto cifrado no válido.");
        }
    } catch (error) {
        alert("Ocurrió un error al desencriptar. Asegúrate de que el texto cifrado sea correcto.");
    }
});

document.getElementById('botonCopiar').addEventListener('click', function() {
    let textoSalida = document.getElementById('textoSalida');
    if (textoSalida.value.trim() === "") {
        alert("No hay nada para copiar.");
        return;
    }
    textoSalida.select();
    textoSalida.setSelectionRange(0, 99999); // Para dispositivos móviles
    document.execCommand('copy');
    mostrarAlerta("Texto copiado");
});

function mostrarAlerta(mensaje, esError = false) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensaje;
    alerta.style.backgroundColor = esError ? '#dc3545' : '#007bff'; // Cambiar color si es un error
    alerta.classList.remove('hidden'); // Remover la clase hidden para mostrar la alerta
    alerta.classList.add('visible'); // Agregar la clase visible para animar la alerta
    setTimeout(() => {
        alerta.classList.remove('visible'); // Ocultar la alerta después de 4 segundos
        alerta.classList.add('hidden'); // Agregar la clase hidden para mantenerla oculta
    }, 4000);
}
