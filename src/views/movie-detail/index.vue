<template>
	<div class="detail-wrapper">
		<div class="movie-image-container">
			<div class="detail-movie-title">
				<i class="icon-back">返回</i>
				<span>电影</span>
			</div>
		</div>
		<scroll class="movie-detail" ref="showDetailWrapper" :data="movieDetail">
			<div class="movie-content">
				<div class="detail-scroll">
					<div class="movie-banner">
						<img class="movie-image" :src="movieDetail.repelace_image" />
					</div>
					<div class="movie-content1">
						<div class="content1">
							<p style="margin-top: 0px">{{movieDetail.title}}</p>
							<p class="font-24 text-gray">
								<span>{{movieDetail.year}}/</span>
								<span v-for="(item, index) in movieDetail.genres">{{item}}
									<span v-if="index != movieDetail.genres.length -1 ">/</span>
								</span>
							</p>
							<p class="font-24 text-gray">原名：{{movieDetail.original_title}}</p>
							<p class="font-24 text-gray" v-if="movieDetail.pubdates">上映时间：{{movieDetail.pubdates[movieDetail.pubdates.length - 1]}}</p>
							<p class="font-24 text-gray" v-if="movieDetail.durations">片长: {{movieDetail.durations[0]}}</p> 
						</div>
						<div class="content2">
							<div class="movie-box">
								<p class="m-t-none">豆瓣评分</p>
								<p v-if="movieDetail.rating" class="movie-average">{{movieDetail.rating.average}}</p>
								<star v-if="movieDetail.rating" :star-total="movieDetail.rating.average" :need-star="true" :need-average="false"></star>
								<p>{{movieDetail.collect_count}}人看过</p>
							</div>
						</div>
					</div>
					<div class="movie-content2">
						<button>想看</button>
						<button>
							<span class="m-r">看过</span>
							<star :star-total="0" :need-star="true" :need-average="false"></star>
						</button>
					</div>
					<div class="base-line"></div>
					<div class="movie-content3">
						<p class="movie-summary-title">剧情简介</p>
						<p class="m-t-none">{{movieDetail.summary}}</p>
					</div>
					<div class="movie-content4" style="margin-bottom:100px">
						<p class="movie-summary-title">影人</p>
						<div class="m-t-none movie-actor-wrapper">
							<div class="movie-actor-content">
								<ul>
									<li class="actor-item" v-for="actor in movieDetail.casts">
										<img class="actor-image" :src="repelaceImage(actor.avatars.small)" v-if="actor.avatars" />
										<p>{{actor.name}}}</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import movieListService from '@/service/movie-list.js'
	import scroll from '@/base/scroll/scroll.vue'
	import BSscroll from 'better-scroll'
	import star from '@/base/star/star.vue'

	var options = {
		scrollY: true,
		pullDownRefresh: {
			threshold: 10,
			stop: 20
		},
		hasVerticalScroll: true,
		click: true,
		pullDownRefresh: false,
		pullUpLoad: false
	}

	export default {
		data() {
			return {
				movieDetail: {},
				movieId: '',
			}
		},
		methods: {
			getMovieDetail(){
				var _this = this;
				var data = {
					'id': this.movieId
				}
				movieListService.getMovieDetail(data).then(function(res){
					_this.$nextTick(function(){
						_this.movieDetail = res;
						_this.movieDetail.repelace_image = _this.repelaceImage(res.images.small);
					})
				})
			},
			repelaceImage(url) {
				var _u = url.substring(7);
				return 'https://images.weserv.nl/?url=' + _u;
			},
		},
		created() {
			this.$nextTick(function(){
				this.movieId = this.$router.history.current.params.id;
				this.getMovieDetail();
			})
		},
		components: {
			scroll: scroll,
			star: star
		}
	}
</script>

<style>
	.detail-wrapper {
		display: flex;
		flex-direction: column;
	}
	.movie-image-container {
		padding-top: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 9999;
	}
	.movie-image {
		width: 800px;
		margin: 0 0 100px 0;
	}
	.detail-movie-title {
		color: #fff;
		margin: 50px 0px;
		position: fixed;
		width: 100%;
	}
	.movie-banner {
		padding-top: 200px;
		background-color: #555;
	}
	.icon-back {
		float: left;
		margin-left: 20px;
	}
	.movie-content-container {
		position: relative;
		overflow: hidden;
		width: 100%;
	}
	.movie-detail {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		/* background-color: #555; */
	}
	.movie-content1 {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 80px 80px 0px 80px;
		align-items: flex-start;
	}
	.text-gray {
		color: #555555c4;
	}
	.font-24{
		font-size: 60px;
	}
	.m-t-none {
		margin-top: 0px !important;
	}
	.m-r {
		margin-right: 30px;
	}
	.content1 {
		text-align: left;
		margin-bottom: 50px;
	}
	.content1 p {
		margin-top: 40px;
		margin-bottom: 40px;
	}
	.movie-box {
		width: 400px;
		height: 400px;
		background-color: #f8f8f8;
		box-shadow: 0px 0px 15px #ccc;
		border-color: #ccc;
		font-size: 60px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #555555c4;
	}
	.movie-box p {
		margin-top: 20px;
		margin-bottom: 20px
	}
	.movie-average {
		font-size: 80px;
		color: #000;
	}
	.movie-content2 {
		display: flex;
		padding: 60px 80px;
		background-color: #fff;
		align-content: space-between;
	}
	.movie-content2 button {
		background-color: #fff;
		border:5px solid #42bd56;
		border-radius: 25px;
		padding: 40px 40px; 
		color: #42bd56;
	}
	.movie-content2 button:nth-child(1) {
		flex-grow: 1;
		margin-right: 50px;
	}
	.movie-content2 button:nth-child(2) {
		flex-grow: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.base-line {
		display: flex;
		height: 3px;
		background-color: #ccc;
		margin: 0px 60px;
	}
	.movie-content3, .movie-content4 {
		display: flex;
		padding: 0px 60px;
		flex-direction: column;
	}
	.movie-content3 p,
	.movie-content4 p {
		font-size: 60px;
		text-align: left;
	}
	.movie-summary-title {
		color: #555555c4;
	}
	.actor-image {
		width: 600px;
	}
</style>