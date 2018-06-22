import originJSONP from 'jsonp'

export function param(data) {
	let url = '';
	for(var k in data) {
		let value = data[k] !== undefined ? data[k] : '';
		url += '&' + k + '=' + encodeURIComponent(value);
	}
	return url ? url.substring(1) : '';
}

export default function jsonp(url, data, option) {
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

	return new Promise((resolve, reject) => {
		originJSONP(url, option, (err, res) => {
			var response = JSON.parse(res);
			resolve(response);
		})
	})
}