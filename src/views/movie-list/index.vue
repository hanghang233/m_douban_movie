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
				<movieList :movie-list="showList" :needDate="needDate" :has-more="hasShowMore" :movie-type="nowIndexNav" ></movieList> 
			</div>
			<div v-if="nowIndexNav == 1" class="show-wapper" ref="commingSoonWrapper">
				<movieList :movie-list="commingSonnList" :needDate="needDate" :has-more="hasCommingMore" :movie-type="nowIndexNav"></movieList>
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
			</scroll>  -->
		</div>
	</div>
</template>

<script>
	import search from '@/components/search/search.vue'
	import BSscroll from 'better-scroll'
	import movieListService from '@/service/movie-list.js' 
	import scroll from '@/base/scroll/scroll.vue'
	import loadMore from '@/base/loadMore/loadMore.vue'
	import movieList from '@/views/movie-list/list.vue'
	import { createMovieList } from '@/common/util/movieList.js'

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
				'nowIndexNav': '0',
				'showList': [], //正在上映的电影
				'commingSonnList': [], //即将上映的电影
				'showStartIndex': 0,
				'commingStartIndex': 0,
				'count': 10,
				'hasShowMore': true,
				'hasCommingMore': true,
				'loadingDataFlag': false,
				'needDate': true
			}
		},
		methods: {
			changeMovieNav(index) {
				this.nowIndexNav = index;
				this.getMovieList();
			},
			isNavActive(index) {
				return this.nowIndexNav == index;
			},
			initScroll() {
				if(!this.scroll) {
					if(this.nowIndexNav == 0){
						//渲染正在上映的电影
						this.scroll = new BSscroll(this.$refs.showWrapper, options);
					}else if(this.nowIndexNav == 1){
						this.scroll = new BSscroll(this.$refs.commingSoonWrapper, options);
					}
				}else {
					this.scroll.refresh();
				}
				var _this = this;
				this.scroll.on('scrollEnd', function(){
					//快滚动到底部
					if(_this.scroll.y <= _this.scroll.maxScrollY + 50){
						if(!_this.loadingDataFlag){
							_this.loadMore();
						}
					}
				})
			},
			getMovieList() {
				this.loadingDataFlag = true;
				var _this = this;
				if(this.nowIndexNav == 0) {
					var data = {
						'start': this.showStartIndex,
						'count': this.count
					}
					//渲染正在上映的电影
					movieListService.getMovieList(data).then(function(res){
						_this.loadingDataFlag = false;
						var movieList = createMovieList(res.subjects);
						_this.showList = _this.showList.concat(movieList);
						_this.checkMore(res)
					})
				}else if(this.nowIndexNav == 1){
					var data = {
						'start': this.commingStartIndex,
						'count': this.count
					}
					//渲染即将上映的电影
					movieListService.getCommingList(data).then(function(res){
						_this.loadingDataFlag = false;
						//组装即将上映的电影
						var movieList = createMovieList(res.subjects);
						_this.commingSonnList = _this.commingSonnList.concat(movieList);
						_this.checkMore(res);
					})
				}
			},
			loadMore() {
				if(this.nowIndexNav == 0 && this.hasShowMore){
					this.showStartIndex = this.showStartIndex + this.count;
					this.getMovieList();
				}else if(this.nowIndexNav == 1 && this.hasCommingMore){
					this.commingStartIndex = this.commingStartIndex + this.count;
					this.getMovieList();
				}
				
			},
			checkMore(res) {
				//判断正在热映电影是否更多
				if(this.nowIndexNav == 0){
					if(this.showStartIndex + this.count > res.total){
						this.hasShowMore = false;
					}
				}else if(this.nowIndexNav == 1){
					//判断即将上映电影是否更多
					if(this.commingStartIndex + this.count > res.total){
						this.hasCommingMore = false;
					}
				}
				this.$nextTick(() => {
                   this.initScroll();
                })
			}
		},
		components: {
			search: search,
			scroll: scroll,
			loadMore: loadMore,
			movieList: movieList
		},
		created() {
			var _this = this;
			var data = {
				'start': _this.showStartIndex,
				'count': _this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = createMovieList(res.subjects);
				_this.$nextTick(() => {
                   _this.initScroll();
                })
			})
		},
		watch: {
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
		position: fixed;
		background-color: #fff;
		width: 100%;
		align-items: center;
		flex-direction: column;
		flex: 1;
		height: 400px;
		z-index: 9999
	}
	.movie-list-content {
		margin: 400px 40px 500px 0px;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
	}
	.show-wapper {
		position: relative;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
</style>
