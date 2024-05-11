window.addEventListener('load', () => {
    // Declara las variables para longitud y latitud
    let lon;
    let lat;

    // Obtiene los elementos HTML necesarios
    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');

    // Verifica si el navegador admite la geolocalización
    if (navigator.geolocation) {
        // Obtiene la posición actual del usuario
        navigator.geolocation.getCurrentPosition((posicion) => {
            // Almacena la longitud y latitud obtenidas
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            // URL de la API del tiempo para la ubicación de Viña del Mar, Chile
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Viña del Mar,CL&lang=es&units=metric&appid=d67e9a3bc86aa9ea1d9a63b674df7775`;

            // Realiza una solicitud a la API del tiempo
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Muestra la temperatura
                    console.log(data.main.temp);
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} ºC `;
                    
                    // Muestra la descripción del clima
                    console.log(data.weather[0].description);
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    
                    // Muestra la ubicación
                    ubicacion.textContent = data.name;
                    
                    // Muestra la velocidad del viento
                    console.log(data.wind.speed);
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    // Establece el ícono animado según el clima
                    console.log(data.weather[0].main);
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg';
                            console.log('TORMENTA');
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg';
                            console.log('LLOVIZNA');
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg';
                            console.log('LLUVIA');
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg';
                            console.log('NIEVE');
                            break;                        
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg';
                            console.log('LIMPIO');
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg';
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                            console.log('NUBES');
                            break;  
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                            console.log('por defecto');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
});
