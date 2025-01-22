document.addEventListener('DOMContentLoaded', () => {
    const binInput = document.getElementById('binInput');
    const resultSection = document.getElementById('result');
    const jsonResponse = document.getElementById('jsonResponse');

    const clearButton = document.createElement('button');
    clearButton.classList.add('clear-button');
    clearButton.textContent = '×';
    binInput.parentElement.appendChild(clearButton);

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    resultSection.appendChild(errorMessage);

    clearButton.addEventListener('click', () => {
        binInput.value = '';
        resultSection.style.display = 'none';
        clearButton.style.display = 'none';
        errorMessage.textContent = '';
    });

    binInput.addEventListener('input', async () => {
        const binValue = binInput.value.trim();

        if (binValue.length > 0) {
            clearButton.style.display = 'block';
        }

        if (binValue.length >= 6) {
            try {
                const response = await fetch(`https://data.handyapi.com/bin/${binValue}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.Status === 'SUCCESS') {
                    resultSection.style.display = 'block';
                    resultSection.classList.add('show');

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
                    errorMessage.textContent = '';
                } else {
                    resultSection.style.display = 'block';
                    resultSection.classList.add('show');
                    errorMessage.textContent = "Datos del BIN no válidos.";
                }
            } catch (error) {
                console.error("Error:", error);
                resultSection.style.display = 'block';
                resultSection.classList.add('show');
                errorMessage.textContent = `Hubo un error al recuperar los datos.`;
            }
        } else {
            resultSection.style.display = 'none';
            errorMessage.textContent = '';
        }
    });
});
