import axios from 'axios'

export default {
	getMovieList(data) {
		var url = "api/movie/in_theaters";
		return axios.get(url, { params: data}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
	getCommingList(data){
		var url = 'api/movie/coming_soon';
		return axios.get(url, { params: data}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	}
}