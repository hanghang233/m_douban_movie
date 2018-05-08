<template>
	<div class="detail-wrapper">
		<div class="movie-image-container">
			<div class="detail-movie-title">
				<i class="icon-back" @click="back()">返回</i>
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
					<div class="movie-content4" style="margin-bottom:200px">
						<p class="movie-summary-title">影人</p>
						<div class="actor-wrapper" ref="actorWrapper">
							<div class="movie-actor-content" ref="movieActorContent">
								<ul class="actor-item-container">
									<li class="actor-item" v-for="actor in movieDetail.actor_list" ref="actItem">
										<img class="actor-image" :src="repelaceImage(actor.avatars.small)" v-if="actor.avatars" />
										<p>{{actor.name}}</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="base-line"></div>
					<div class="movie-content5">
						<ul class="movie-nav">
							<li :class="{'movie-nav-active': isNavActive('0')}" @click="changeMovieNav('0')">短评</li>
							<li :class="{'movie-nav-active': isNavActive('1')}" @click="changeMovieNav('1')">影评</li>
						</ul>
						<paraList @goReviewList="goReviewList()" :list="movieDetail.popular_comments" :movie-id="movieId" :count="movieDetail.comments_count" v-if="nowParaIndex == '0'"></paraList>
						<reviewsList :list="movieDetail.popular_reviews" :movie-id="movieId" :count="movieDetail.collect_count" v-if="nowParaIndex == '1'"></reviewsList>
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
	import paraList from '@/views/movie-detail/paraList.vue'
	import reviewsList from '@/views/movie-detail/reviewsList.vue'

	var options = {
		scrollY: false,
		scrollX: true,
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
				actorScroll: '',
				nowParaIndex: 0,
				count: 20,
				shortParaStart: 0,
				filmParaStart: 0,
				shortParaList: [],
				filmParaSList: []
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
					_this.movieDetail.actor_list = _this.movieDetail.directors.concat(_this.movieDetail.casts);
					_this.initActorScroll();
				})
			},
			repelaceImage(url) {
				var _u = url.substring(7);
				return 'https://images.weserv.nl/?url=' + _u;
			},
			initActorScroll() {
				var width = 0;
				this.$nextTick(function(){
					for(var i=0;i<this.movieDetail.actor_list.length;i++){
						width += parseInt(this.$refs.actItem[i].clientWidth + 20);
					}
					this.$refs.movieActorContent.style.width = width + 'px';
					if(!this.actorScroll){
						this.actorScroll = new BSscroll(this.$refs.actorWrapper, options);
					}else{
						this.actorScroll.refresh();
					}
				})
			},
			isNavActive(index) {
				return this.nowParaIndex == index;
			},
			changeMovieNav(index) {
				this.nowParaIndex = index;
			},
			getParaList() {
				if(this.nowParaIndex == 0){
					var data = {
						'start': this.shortParaStart,
						'count': this.count,
						'id': this.movieId
					}
					var _this = this;
					movieListService.getCommingList(data).then(function(res){
						_this.shortParaList = res.data;
					})
				}
			},
			goReviewList() {
				this.$router.push({
					name: 'commentlist',
					params: {id: this.movieId}
				})
			},
			back() {
				this.$router.go(-1);
			}
		},
		created() {
			this.movieId = this.$router.history.current.params.id;
			this.getMovieDetail();
			this.getParaList();
		},
		components: {
			scroll: scroll,
			star: star,
			paraList: paraList,
			reviewsList: reviewsList
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
		margin: 0px;
		position: fixed;
		width: 100%;
		padding: 50px 20px;
		background-color: #5555557d;
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
		background-color: #555; 
	}
	.movie-detail > div {
		background-color: #fff;
	}
	.movie-content1 {
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
		width: 400px;
	}
	.movie-actor-content {
		overflow: hidden;
	}
	.actor-item-container {
		list-style-type: none;
		padding-left: 0px;
		display: flex;
		overflow-x: scroll;
		margin-top: 0px;
	}
	.actor-item-container li{
		display: inline-block;
		margin-right: 50px;
	}
	.actor-wrapper {
		position: absolute;
		overflow: hidden;
		width: 100%;
		margin-top: 200px;
	}
	.movie-nav {
		display: inline-block;
		list-style-type: none;
		display: flex;
		font-size: 70px;
		padding: 0px;
		margin: 0px;
		width: 100%;
	}
	.movie-nav li {
		flex: 1;
		padding: 40px 0px;
	}
	.movie-nav-active {
		border-bottom: 10px solid #42bd56;
		color: #42bd56;
	}
	.movie-content5 {
		margin-bottom: 250px;
	}
</style>