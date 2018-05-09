import axios from 'axios'
//import { commonParams } from './config';
var apikey = '0b2bdeda43b5688921839c8ecb20399b'

export default {
	getMovieList(data) {
		var url = "api/movie/in_theaters";
		data.apikey = apikey;
		return axios.get(url, { params: data}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
	getCommingList(data) {
		var url = 'api/movie/coming_soon';
		data.apikey = apikey;
		return axios.get(url, { params: data}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
	getMovieDetail(data) {
		var url = 'api/movie/subject/' + data.id;
		return axios.get(url, {params: {apikey: apikey}}).then(function(res){
			return Promise.resolve(res.data)
		}).catch(function(err){
			console.log(err);
		})
	},
	getCommentsList(data) {
		var url = 'api/movie/subject/' + data.id + '/comments';
		var params = {
			'start': data.start,
			'count': data.count,
			'apikey': apikey
		}
		return axios.get(url, { params: params}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
	searchList(data) {
		var url = 'api/movie/search';
		var params = {
			'start': data.start,
			'count': data.count,
			'apikey': apikey,
			'tag': data.tag
		}
		return axios.get(url, { params: params}).then(function(res){
			return Promise.resolve(res.data);
		}).catch(function(err){
			console.log(err);
		})
	},
}