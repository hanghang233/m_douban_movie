<template>
	<div id="movieList">
		<div class="movie-list-header">
			<search></search>
			<ul class="movie-nav">
				<li :class="{'movie-nav-active': isNavActive('0')}" @click="changeMovieNav('0')">正在上映</li>
				<li :class="{'movie-nav-active': isNavActive('1')}" @click="changeMovieNav('1')">即将上映</li>
			</ul>
		</div>
		<div class="movie-list-content">
			<div v-if="nowIndexNav == 0" class="show-wapper" ref="showWrapper">
				<ul class="movie-list-container">
					<li v-for="item in showList">
						<img :src="getImages(item.images.small)" style="width: 90px;height: 130px" />
						<div class="movie-info">
							<p class="movie-title text-80">{{item.title}}</p>
							<p class="movie-star text-60">{{item.rating.average}}</p>
							<p class="movie-director text-60">导演：{{item.directors.name}}</p>
							<p class="movie-actors text-60">主演：<span v-for="actor in item.casts">{{actor.name}}/</span></p>
							<p class="collect_count text-60">{{item.collect_count}}人看过</p>
						</div>
					</li>
					<li @click="loadMore()">加载更多</li>
				</ul>
			</div>
			<div v-if="nowIndexNav == 1" class="comming-soon-wrapper" ref="commingSoonWrapper">
				<ul class="movie-list-container">
					<li v-for="item in commingSonnList">
						<img :src="getImages(item.images.small)" style="width: 90px;height: 130px" />
						<div class="movie-info">
							<p class="movie-title text-80">{{item.title}}</p>
							<p class="movie-star text-60">{{item.rating.average}}</p>
							<p class="movie-director text-60">导演：{{item.directors.name}}</p>
							<p class="movie-actors text-60">主演：<span v-for="actor in item.casts">{{actor.name}}/</span></p>
							<p class="collect_count text-60">{{item.collect_count}}人看过</p>
						</div>
					</li>
					<li @click="loadMore()">加载更多</li>
				</ul>
			</div>
			<!-- <scroll v-if="nowIndexNav == 0" :data="showList" ref="showWrapper" :class="show-wapper" @scrollToEnd="loadMore">
				<ul class="movie-list-container">
					<li v-for="item in showList">
						<img :src="item.images.small" style="width: 90px;height: 130px" />
						<div class="movie-info">
							<p class="movie-title text-80">{{item.title}}</p>
							<p class="movie-star text-60">{{item.rating.average}}</p>
							<p class="movie-director text-60">导演：{{item.directors.name}}</p>
							<p class="movie-actors text-60">主演：<span v-for="actor in item.casts">{{actor.name}}/</span></p>
							<p class="collect_count text-60">{{item.collect_count}}人看过</p>
						</div>
					</li>
				</ul>
			</scroll>
			<scroll v-if="nowIndexNav == 1" :data="commingSonnList" ref="commingSoonWrapper" :class="comming-soon-wrapper" @scrollToEnd="loadMore">
				<ul class="movie-list-container">
					<li v-for="item in commingSonnList">
						<img :src="item.images.small" style="width: 90px;height: 130px" />
						<div class="movie-info">
							<p class="movie-title text-80">{{item.title}}</p>
							<p class="movie-star text-60">{{item.rating.average}}</p>
							<p class="movie-director text-60">导演：{{item.directors.name}}</p>
							<p class="movie-actors text-60">主演：<span v-for="actor in item.casts">{{actor.name}}/</span></p>
							<p class="collect_count text-60">{{item.collect_count}}人看过</p>
						</div>
					</li>
				</ul>
			</scroll> -->
		</div>
	</div>
</template>

<script>
	import search from '@/components/search/search.vue'
	import BSscroll from 'better-scroll'
	import movieListService from '@/service/movie-list.js' 
	import scroll from '@/base/scroll/scroll.vue'

	var wapper = document.querySelector('.wapper');
	export default {
		name: 'movieList',
		data() {
			return {
				'nowIndexNav': 0,
				'showList': [], //正在上映的电影
				'commingSonnList': [], //即将上映的电影
				'showStartIndex': 0,
				'commingStartIndex': 0,
				'count': 10
			}
		},
		methods: {
			changeMovieNav(index) {
				this.nowIndexNav = index;
				var _this = this;
				this.getMovieList();
			},
			isNavActive(index) {
				return this.nowIndexNav == index;
			},
			initScroll() {
				if(this.nowIndex == 0){
					//渲染正在上映的电影
					this.showScroll = new BSscroll(this.$refs.showWrapper, {});
				}else if(this.nowIndex == 1){
					this.commingSoonScroll = new BSscroll(this.$refs.commingSoonWrapper, {});
				}
			},
			getMovieList() {
				var _this = this;
				if(this.nowIndexNav == 0) {
					var data = {
						'start': this.showStartIndex,
						'count': this.count
					}
					//渲染正在上映的电影
					movieListService.getMovieList(data).then(function(res){
						console.log(res.data);
						_this.showList = _this.showList.concat(res.subjects);
					})
				}else if(this.nowIndexNav == 1){
					var data = {
						'start': this.commingStartIndex,
						'count': this.count
					}
					//渲染即将上映的电影
					movieListService.getCommingList(data).then(function(res){
						console.log(res.data);
						_this.commingSonnList = _this.commingSonnList.concat(res.subjects);
					})
				}
			},
			loadMore() {
				if(this.nowIndexNav == 0){
					this.showStartIndex = this.showStartIndex + this.count;
				}else if(this.nowIndexNav == 1){
					this.commingStartIndex = this.commingStartIndex + this.count;
				}
				this.getMovieList();
			},
			getImages(url) {
				if(url){
					let _u = url.substring( 7 );
        			return 'https://images.weserv.nl/?url=' + _u;
				}
			}
		},
		components: {
			search: search,
			scroll: scroll
		},
		created() {
			var _this = this;
			var data = {
				'start': _this.showStartIndex,
				'count': _this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = res.subjects;
				/*_this.$nextTick(function(){
					_this.initScroll();
				})*/
			})
		}
	}
</script>

<style type="text/css">
	#movieList {
		color: #777;
		display: flex;
		flex-direction: column;
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
	.movie-list-container {
		list-style-type: none;
		padding-left: 0px;
	}
	.movie-list-container li{
		display: flex;
		margin-bottom: 50px;
	}
	.movie-info {
		flex: 1;
		margin-left: 50px;
	}
	.movie-title {
		color: #333;
	}
	.text-80 {
		font-size: 80px;
	}
	.text-60 {
		font-size: 60px;
	}
	.movie-info p {
		text-align: left;
		margin-top: 0px;
		margin-bottom: 30px;
	}
	.movie-list-header {
		display: flex;
		position: fixed;
		background-color: #fff;
		width: 100%;
		align-items: center;
		flex-direction: column;
		flex: 1;
		height: 400px;
	}
	.movie-list-content {
		flex: 1;
		margin-top: 350px;
		margin: 350px 40px 200px 40px;
	}
</style>
