document.addEventListener('DOMContentLoaded', () => {
    const binInput = document.getElementById('binInput');
    const resultSection = document.getElementById('result');
    const jsonResponse = document.getElementById('jsonResponse');
    
    // Agregar la "x" de borrar
    const clearButton = document.createElement('button');
    clearButton.classList.add('clear-button');
    clearButton.textContent = '×';
    binInput.parentElement.appendChild(clearButton);

    // Crear el contenedor de mensaje de error dentro de result
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    resultSection.appendChild(errorMessage);

    // Evento para limpiar el input
    clearButton.addEventListener('click', () => {
        binInput.value = '';
        resultSection.style.display = 'none';
        clearButton.style.display = 'none';
        errorMessage.textContent = ''; // Limpiar el mensaje de error
    });

    // Evento para detectar cuando se ingresan 6 dígitos y hacer la solicitud a la API
    binInput.addEventListener('input', async () => {
        const binValue = binInput.value.trim();
        
        // Mostrar la "x" cuando el input tenga texto
        if (binValue.length > 0) {
            clearButton.style.display = 'block';
        }
        
        // Si el valor tiene más de 6 dígitos, enviar la solicitud a la API
        if (binValue.length >= 6) {
            try {
                const response = await fetch(`https://data.handyapi.com/bin/${binValue}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Verificar si el estado de la respuesta es "SUCCESS"
                if (data.Status === 'SUCCESS') {
                    // Mostrar la respuesta en la interfaz
                    resultSection.style.display = 'block';
                    resultSection.classList.add('show'); // Activar la animación de desvanecimiento

                    const resultHtml = ` 
                        <div class="result-row">
                            <div><strong>Esquema</strong> <br> ${data.Scheme}</div>
                            <div><strong>Tipo</strong> <br> ${data.Type}</div>
                            <div><strong>Emisor</strong> <br> ${data.Issuer}</div>
                        </div>
                        <div class="result-row">
                            <div><strong>Nivel de Tarjeta:</strong> <br> ${data.CardTier}</div>
                            <div><strong>País</strong> <br> ${data.Country.Name}</div>
                            <div><strong>Luhn</strong> <br> ${data.Luhn}</div>
                        </div>
                    `;

                    jsonResponse.innerHTML = resultHtml;
                    errorMessage.textContent = ''; // Limpiar el mensaje de error
                } else {
                    resultSection.style.display = 'block'; // Asegurarnos de que se muestre el contenedor
                    resultSection.classList.add('show'); // Activar la animación de desvanecimiento
                    errorMessage.textContent = "Datos del BIN no válidos.";
                }
            } catch (error) {
                console.error("Error:", error);
                resultSection.style.display = 'block'; // Asegurarnos de que se muestre el contenedor
                resultSection.classList.add('show'); // Activar la animación de desvanecimiento
                errorMessage.textContent = `Hubo un error al recuperar los datos.`;
            }
        } else {
            resultSection.style.display = 'none';
            errorMessage.textContent = ''; // Limpiar el mensaje de error cuando el input es insuficiente
        }
    });
});
