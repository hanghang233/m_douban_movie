<template>
	<div>
		<div class="rank-container">
			<h3>精选榜单</h3>
			<div class="rank-item1">
				<div class="rank-title">
					<p class="text-lx ">豆瓣TOP250</p>
					<p class="text-xs">8分以上好电影</p>
				</div>
				<swiper :list="topList"></swiper>
			</div>
			<div class="rank-item2">
				<div class="rank-title">
					<p class="text-lx ">本周口碑榜</p>
					<p class="text-xs">5月14号-5月20号</p>
				</div>
				<swiper :list="weekList"></swiper>
			</div>
			<div class="rank-item3">
				<div class="rank-title">
					<p class="text-lx ">新片榜</p>
					<p class="text-xs">5月14号-5月20号</p>
				</div>
				<swiper :list="commingSoonList"></swiper>
			</div>
			<div class="rank-item4">
				<div class="rank-title">
					<p class="text-lx ">北美票房榜</p>
					<p class="text-xs">票房最高排名</p>
				</div>
				<swiper :list="bookingOfficeList"></swiper>
			</div>
		</div>
	</div>
</template>

<script>
	import movieRakingService from '@/service/movie-ranking.js'
	import swiper from '@/views/ranking/swiper.vue'
	export default {
		data() {
			return {
				topList: [],
				start: 0,
				count: 3,
				weekList: [],
				commingSoonList: [],
				bookingOfficeList: []
			}
		},
		methods: {
			getTopList() {
				var data = {
					'start': this.start,
					'count': this.count
				}
				var _this = this;
				movieRakingService.getTopMovieList(data).then(function(res){
					_this.topList = res.subjects;
				})
			},
			getWeekly() {
				var data = {
					'start': this.start,
					'count': this.count
				}
				var _this = this;
				movieRakingService.getWeekList(data).then(function(res){
					var arr = res.subjects;
					arr.splice(3, arr.length - 3);
					_this.weekList = arr;
				})
			},
			getNewMovies() {
				var data = {
					'start': this.start,
					'count': this.count
				}
				var _this = this;
				movieRakingService.getCommingSonnList(data).then(function(res){
					var arr = res.subjects;
					arr.splice(3, arr.length - 3);
					_this.commingSoonList = arr;
				})
			},
			getBookingList() {
				var data = {
					'start': this.start,
					'count': this.count
				}
				var _this = this;
				movieRakingService.getBookingList(data).then(function(res){
					var arr = res.subjects;
					arr.splice(3, arr.length - 3);
					_this.bookingOfficeList = arr;
				})
			},
		},
		created() {
			this.getTopList();
			this.getWeekly();
			this.getNewMovies();
			this.getBookingList();
		},
		components: {
			swiper: swiper
		}
	}
</script>

<style type="text/css" lang="less">
	@font-white: #fff;
	.text-white {
		color: @font-white
	}
	.rank-container {
		display: flex;
		flex-direction: column;
		margin: 0 0.5rem;
	}
	.rank {
		width: 100%;
		display: flex;
		height: 9rem;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		margin-bottom: 1rem;
	}
	.rank-item1 {
		background: linear-gradient(#e1a80c, #eed2bd);
		.rank;
	}
	.rank-item2 {
		background: linear-gradient(#35c161, #9de4bb);
		.rank;
	}
	.rank-item3 {
		background: linear-gradient(#a565c5, #d6b5e6);
		.rank;
	}
	.rank-item4 {
		background: linear-gradient(#de7488, #f2b5c2);
		.rank;
	}
	.rank-title {
		color: @font-white;
	}
	.m-b-none {
		margin-bottom: 0px;
	}
	.rank-title p {
		margin: 0px;
	}
	.text-lx {
		font-size: 1.2rem;
	}
	.text-xs {
		font-size: 0.8rem;
	}
	.image-item {
		width: 4.5rem;
	}
	.rank-image {
		list-style-type: none;
		position: relative;
		width: 9rem;
		height: 6.5rem;
		margin: 0px 0.5rem 0px 2rem;
	}
	.rank-image li {
		display: inline-block;
		position: absolute;
	}
	.image-item0 {
		left: 0px;
		top: 0.4rem;
	}
	.image-item1 {
		left: 3rem;
		z-index: 9999;
	}
	.image-item2 {
		right: 0px;
		top: 0.4rem;
	}
	.rank-image-item0 {
		width: 4rem;
	}
	.rank-image-item1 {
		.image-item;
	}
	.rank-image-item2 {
		width: 4rem;
	}
</style>