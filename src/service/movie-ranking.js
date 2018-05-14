import axios from 'axios'
//import { commonParams } from './config';
var apikey = '0b2bdeda43b5688921839c8ecb20399b'

export default {
	//top250
	getTopMovieList(data) {
		var url = "api/movie/top250";
		var params = {
			'apikey': apikey,
			'start': data.start,
			'count': data.count
		}
		return axios.get(url, { params: params}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
	
}