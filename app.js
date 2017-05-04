const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
	if(errorMsg){
		console.log(errorMsg);
	}else{
		console.log(`Weather of: ${results.address}`);
		weather.getWeather(results.latitude, results.longitude, (errorMsg, results) => {
			if(errorMsg){
				console.log(errorMsg);
			}else{
				console.log(`It is ${results}\xB0 C`);
			}
		});
	}
});
