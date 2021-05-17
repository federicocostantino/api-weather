// Al ejecutar la página, carga los datos de localStorage.
window.onload = function() {
	var objeto = JSON.parse(localStorage.getItem('datos'));
	const apiKeyMaps = '';

	iconoClima.src = "http://openweathermap.org/img/wn/" + objeto.weatherIcon + "@2x.png"; 
	ciudad.innerHTML = objeto.ciudad + ", " + objeto.pais;
	descripcion.innerHTML = objeto.descripcion;
	temperatura.innerHTML = objeto.temperatura + "°C";
	sensacionTermica.innerHTML = "Sensación térmica: " + objeto.feelsLike + "°C";
	temperaturaMaxima.innerHTML = "Temperatura máxima: " + objeto.tempMax + "°C";
	temperaturaMinima.innerHTML = "Temperatura mínima: " + objeto.tempMin + "°C";
	humedad.innerHTML = "Humedad: " + objeto.humidity + "%";
	presion.innerHTML = "Presión: " + objeto.pressure + " hPa";
	velocidadViento.innerHTML = "Velocidad del viento: " + objeto.speed + "km/h";
	iframe.src = "https://www.google.com/maps/embed/v1/place?key=" + apiKeyMaps + "&q=" + objeto.ciudad;
}

// COMPROBAMOS DISPONIBILIDAD DEL LOCALSTORAGE EN EL BROWSER.
/*
	NOTA AL PROFESOR: YA SÉ QUE NO LO PEDÍA LA CONSIGNA. PERO ME PUSE A LEER LA DOCUMENTACIÓN DE LA API DE WEBSTORAGE Y ME PARECIÓ BASTANTE INTERESANTE AGREGARLO.
*/ 
if (storageAvailable('localStorage')) {
	var inputValue = document.querySelector('.inputValue');
	var iconoClima = document.querySelector('.iconoClima');
	var ciudad = document.querySelector('.ciudad');
	var descripcion = document.querySelector('.descripcion');
	var temperatura = document.querySelector('.temperatura');
	var temperaturaMaxima = document.querySelector('.temperaturaMaxima');
	var temperaturaMinima = document.querySelector('.temperaturaMinima');
	var humedad = document.querySelector('.humedad');
	var sensacionTermica = document.querySelector('.sensacionTermica');
	var presion = document.querySelector('.presion');
	var velocidadViento = document.querySelector('.velocidadViento');
	var iframe = document.querySelector('.iframe');
	document.querySelector('.button').addEventListener('click', traerClima);
} else {
	alert("Oh, lo lamentamos :(. No hay almacenamiento local en este navegador. Si usás Safari, reconsideralo.");
}

// ------------------ FUNCIONES ------------------ //

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function traerClima() {

	const apiKeyWeather = '';
	const apiKeyMaps = '';
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=';

	fetch(url + inputValue.value + '&appid=' + apiKeyWeather + '&lang=es' + '&units=metric')
	.then(response => {
		return response.json();
	})
	.then(data => {

		var ciudadValue = data.name;
		var pais = data.sys.country;
		var descripcionValue = data.weather[0].description;
		var weatherIcon = data.weather[0].icon;		
		var temperaturaValue = Math.round(data.main.temp);
		var feelsLike = Math.round(data.main.feels_like);
		var tempMax = Math.round(data.main.temp_max);
		var tempMin = Math.round(data.main.temp_min);
		var humidity = data['main']['humidity'];
		var pressure = data['main']['pressure'];
		var speed = Math.round((data['wind']['speed'])*3.6);

		ciudad.innerHTML = ciudadValue + ", " + pais;
		descripcion.innerHTML = descripcionValue;
		temperatura.innerHTML = temperaturaValue + "°C";
		iconoClima.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
		sensacionTermica.innerHTML = "Sensación térmica: " + feelsLike + "°C";
		temperaturaMaxima.innerHTML = "Temperatura máxima: " + tempMax + "°C";
		temperaturaMinima.innerHTML = "Temperatura mínima: " + tempMin + "°C";
		humedad.innerHTML = "Humedad: " + humidity + "%";
		presion.innerHTML = "Presión: " + pressure + " hPa";
		velocidadViento.innerHTML = "Velocidad del viento: " + speed + " km/h";
		iframe.src = "https://www.google.com/maps/embed/v1/place?key=" + apiKeyMaps + "&q="+ ciudadValue;

		//-----------------------------------------------------------------------------
		// LOCALSTORAGE
		var misDatos = {"ciudad": ciudadValue, "descripcion": descripcionValue, "temperatura": temperaturaValue, "feelsLike": feelsLike, "tempMax": tempMax, "tempMin": tempMin, "humidity": humidity, "pressure": pressure, "speed": speed, "weatherIcon": weatherIcon, "pais": pais};

		localStorage.setItem('datos', JSON.stringify(misDatos));
		// FIN LOCALSTORAGE
		//-----------------------------------------------------------------------------
	})

	.catch(err => alert(err))
}















