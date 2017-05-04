const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to get the weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress;
axios.get(geocodeUrl)
	.then((response) => {
		if(response.data.status === 'ZERO_RESULTS')
			throw new Error('No match for the given address.');
		
		var result = {
				address: response.data.results[0].formatted_address,
				latitude: response.data.results[0].geometry.location.lat,
				longitude: response.data.results[0].geometry.location.lng
			};
		console.log('Temperature of location "'+result.address+'" is');

		var lat = result.latitude;
		var lon = result.longitude;
		const apiKey = 'ff4a867317e88d6bd50e22c69b759b47';
		var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&APPID=${apiKey}`;

		return axios.get(weatherUrl);
	})
	.then((response) => {
		console.log(response.data.main.temp+'\xB0 C');
	})
	.catch((e) => {
		if(e.code === 'ENOTFOUND')
			console.log('Error: Unable to connect to the API servers!');
		else
			console.log('Error:', e.message);
	});