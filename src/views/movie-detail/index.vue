<template>
	<div class="detail-wrapper">
		<div class="movie-image-container">
			<div class="movie-title">
				<i class="icon-back">返回</i>
				<span>电影</span>
			</div>
			<div class="movie-banner">
				<img class="movie-image" :src="movieDetail.repelace_image" />
			</div>
		</div>
		<div class="movie-content-container">
			<div class="movie-content1">
				<div class="content1">
					<p>{{movieDetail.title}}</p>
					<p>{{movieDetail.year}}</p>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
	import movieListService from '@/service/movie-list.js'
	export default {
		data() {
			return {
				movieDetail: {},
				movieId: ''
			}
		},
		methods: {
			getMovieDetail(){
				var _this = this;
				var data = {
					'id': this.movieId
				}
				movieListService.getMovieDetail(data).then(function(res){
					_this.movieDetail = res;
				 	_this.movieDetail.repelace_image = _this.repelaceImage(res.images.small);
				})
			},
			repelaceImage(url) {
				var _u = url.substring(7);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		created() {
			this.movieId = this.$router.history.current.params.id;
			this.getMovieDetail();
		}
	}
</script>

<style>
	.movie-image-container {
		background-color: #555;
		padding-top: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.movie-image {
		width: 800px;
		margin: 0 0 100px 0;
	}
	.movie-title {
		color: #fff;
		margin: 50px 0px;
		position: fixed;
		width: 100%;
	}
	.movie-banner {
		margin-top: 200px;
	}
	.icon-back {
		float: left;
		margin-left: 20px;
	}
	.movie-content-container {
		background-color: #fff;
	}
</style>