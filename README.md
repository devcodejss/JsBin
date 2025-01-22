# Bin Checker

Este proyecto es un **verificador de BIN** (Bank Identification Number) que permite a los usuarios ingresar los primeros 6 dígitos de un número de tarjeta de crédito o débito y obtener información sobre su entidad emisora, tipo de tarjeta y más.

## Características

- Verificación en tiempo real de los primeros 6 dígitos de una tarjeta.
- Información sobre la entidad emisora, tipo de tarjeta, y más.
- Diseño responsivo que se adapta a diferentes tamaños de pantalla.
- Efectos visuales con partículas para una mejor experiencia de usuario.
- **No se recopilan datos**: El proyecto no almacena ni recopila ninguna información personal o de tarjetas de los usuarios. La información proporcionada es solo una consulta en tiempo real a la API de HandyAPI.

## Cómo Funciona

El verificador de BIN utiliza la **API gratuita de HandyAPI** para obtener información sobre el BIN ingresado. Puedes probar el verificador simplemente ingresando los 6 primeros dígitos de una tarjeta de crédito o débito en el campo de texto.

## Créditos

Este proyecto utiliza la API de **HandyAPI** para obtener la información del BIN de las tarjetas. Puedes acceder a la API de HandyAPI en el siguiente enlace: [HandyAPI BIN API](https://data.handyapi.com/bin/).

## Tecnologías Usadas

- **HTML5**: Estructura del sitio web.
- **CSS3**: Estilos para el diseño y la presentación.
- **JavaScript**: Funcionalidades interactivas.
- **API de HandyAPI**: Para obtener los detalles del BIN.
- **Particles.js**: Efectos visuales con partículas.