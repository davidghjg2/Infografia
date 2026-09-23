// =============================================
// EXPRESIONES REGULARES EN JAVASCRIPT
// =============================================

const regexPatterns = {
    nombre:   /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]{3,50}$/,
    correo:   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telefono: /^[267]\d{3}-?\d{4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    url:      /^https?:\/\/(www\.)?[\w-]+\.[a-z]{2,}(\/\S*)?$/i
};

const mensajes = {
    nombre:   { ok: " Nombre válido", error: " Solo letras y espacios (3-50 caracteres)" },
    correo:   { ok: "Correo válido", error: " Formato de correo incorrecto" },
    telefono: { ok: "Teléfono válido", error: " Formato: 7012-3456 o 70123456" },
    password: { ok: "Contraseña segura", error: " Mín. 8 chars: mayúscula, minúscula, número y carácter especial" },
    url:      { ok: "URL válida", error: " Formato: https://www.ejemplo.com" }
};

// Validar un campo individual
function validarCampo(campo) {
    const input = document.getElementById(campo);
    const msg = document.getElementById(campo + "Msg");
    const valor = input.value.trim();

    if (valor === "") {
        input.className = "";
        msg.textContent = "";
        msg.className = "message";
        return false;
    }

    // Usamos el método .test() de las expresiones regulares
    if (regexPatterns[campo].test(valor)) {
        input.className = "valid";
        msg.textContent = mensajes[campo].ok;
        msg.className = "message success";
        return true;
    } else {
        input.className = "invalid";
        msg.textContent = mensajes[campo].error;
        msg.className = "message error";
        return false;
    }
}

// Validación en tiempo real
["nombre", "correo", "telefono", "password", "url"].forEach(campo => {
    document.getElementById(campo).addEventListener("input", () => validarCampo(campo));
});

// Validación al enviar el formulario
document.getElementById("validationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const campos = ["nombre", "correo", "telefono", "password", "url"];
    let todosValidos = true;

    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            todosValidos = false;
        }
    });

    const resultado = document.getElementById("finalResult");
    if (todosValidos) {
        resultado.textContent = "¡Todos los campos son válidos! Las expresiones regulares funcionaron correctamente.";
        resultado.className = "result success";
    } else {
        resultado.textContent = "Por favor corrige los campos marcados en rojo.";
        resultado.className = "result error";
    }
});