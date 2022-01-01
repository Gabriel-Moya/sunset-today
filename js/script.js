const form = document.querySelector('#captureData');
const GPSlocation = document.querySelector('#captureGPS')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inLatitude = e.target.querySelector('#latitude');
    const inLongitude = e.target.querySelector('#longitude');

    const latitude = parseFloat(inLatitude.value).toFixed(7);
    const longitude = parseFloat(inLongitude.value).toFixed(7);

    // Somente debugando
    console.log(latitude, longitude);

    const returnRequest = getSunset(latitude, longitude);
    const sunsetObj = JSON.parse(returnRequest);
    
    const {
        results: { sunset }
    } = sunsetObj;

    const sunsetTime = sunset;

    // Somente debugando
    console.log(`${sunset} - ${typeof (sunset)}`);

    const result = `Por do sol será às: ${sunsetTime}`;
    setResult(result);


});

GPSlocation.onclick = function () {
    const userPosition = getLocation();
    userPosition.getCurrentPosition(setSunset, errorGeolocation);
}

function getSunset(lat, lng) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, false);
    xhttp.send();
    return xhttp.responseText;
}

function createParagraph() {
    const p = document.createElement('p');
    return p;
}

function setResult(message) {
    const result = document.querySelector('#result');
    result.innerHTML = '';
    const p = createParagraph();
    p.classList.add('sunset');
    p.innerHTML = message;
    result.appendChild(p);
}

function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation;
    } else {
        const msgError = 'Desculpe, este navegador não suporta geolocalização, por favor, troque de navegador e tente novamente.'
        setResult(msgError);
    }
}

function setSunset(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const returnRequest = getSunset(latitude, longitude);
    
    const sunsetObj = JSON.parse(returnRequest);
    
    const {
        results: { sunset }
    } = sunsetObj;

    const sunsetTime = sunset;

    // Somente debugando
    console.log(`${sunset} - ${typeof (sunset)}`);

    const result = `Por do sol será às: ${sunsetTime}`;
    setResult(result);
}

function errorGeolocation() {
    setResult('Erro de geolocalização');
}

/* https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today */