const request = require('request');

const apiKey = 'ff4a867317e88d6bd50e22c69b759b47';

var getWeather = (lat, lon, callback) => {
	var errorMsg = undefined;
	var results = undefined;
	request({
		url: `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&APPID=${apiKey}`,
		json: true
	},(err,response,body) => {
		if(err){
			errorMsg = 'Error: Unable to connect to the weather api server';
		}else if(body.cod !== 200){
			errorMsg = 'Error: '+body.message;
		}else {
			results = body.main.temp;
		}

		callback(errorMsg, results);
	});
}

module.exports.getWeather = getWeather;
