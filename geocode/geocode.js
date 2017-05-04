const request = require('request');


var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);
	var errorMsg = undefined;
	var result = undefined;
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress;
	request({
		url,
		json:true
	},(error, response, body) => {
		if(error){
			errorMsg = 'Unable to connect to Google servers.';
		}else if(body.status === 'ZERO_RESULTS'){
			errorMsg = 'Unable to find that address.';
		}else if(body.status === 'OK'){
			result = {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			};
		}
		callback(errorMsg, result);
	});	
}

module.exports = {
	geocodeAddress
}
