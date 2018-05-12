<template>
	<transition name="fade" mode="out-in">
		<div class="search">
			<searchBox @searchMovie="searchMovie" v-show="searchFlag"></searchBox>
			<div v-if="!searchFlag">
				<div class="search-title">
					<span style="margin-right: 1rem" @click="back()">返回</span>
					<span>{{title}}</span>
				</div>
				<scroll class="show-search-list-wrapper" ref="showSearchListWrapper" :data="movieList" :pullup="true" @scrollToEnd="scrollSearchEnd">
					<ul class="search-list-container">
						<li v-for="item in movieList">
							<div>
								<img class="search-img" :src="getPic(item.images.small)" />
							</div>
							<div class="search-item">
								<p class="m-t-none">{{item.title}}</p>
								<p>
									<span v-if="item.rating">{{item.rating.average}} /</span>
									<span v-if="item.pubdates">{{item.pubdates[item.pubdates.length - 1]}}</span>
								</p>
							</div>
						</li>
						<li style="margin-bottom: 5rem"><loadMore :has-more="hasMore"></loadMore></li>
					</ul>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import searchBox from '@/views/search/searchBox.vue'
	import movieListService from '@/service/movie-list.js' 
	import scroll from '@/base/scroll/scroll.vue'
	import loadMore from '@/base/loadMore/loadMore.vue'
	export default {
		name: 'search',
		data() {
			return {
				start: 0,
				count: 10,
				movieList: [],
				searchFlag: true,
				title: '',
				hasMore: true,
				tag: ''
			}
		},
		methods: {
			searchMovie(tag) {
				var data = {
					'start': this.start,
					'count': this.count,
					'tag': tag
				}
				this.tag = tag;
				var _this = this;
				movieListService.searchList(data).then(function(res){
					_this.movieList = _this.movieList.concat(res.subjects);
					_this.searchFlag = false;
					_this.title = '关于' + _this.tag + '的电影';
					console.log(111);
					_this.checkSearchMore(res);
				})
			},
			getPic(url) {
				if(url) {
					var _u = url.substring(7);
					return 'https://images.weserv.nl/?url=' + _u;
				}else {
					return '';
				}
			},
			back() {
				this.searchFlag = true;
			},
			checkSearchMore(res) {
				if(this.start + this.count > res.total){
					this.hasMore = false;
				}else {
					this.start = this.start + this.count;
				}
			},
			scrollSearchEnd() {
				this.searchMovie(this.tag);
			}
		},
		components: {
			searchBox: searchBox,
			scroll: scroll,
			loadMore: loadMore
		}
	}
</script>

<style type="text/css">
	.fade-enter-active, .fade-leave-active {
		transition: all 0.3s ease;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0
	}
	.search-title {
		width: 100%;
		height: 2rem;
		padding: 0.5rem 1.5rem;
		display: flex;
		align-items: flex-start;
		border-bottom: 1px solid #ccc;
		font-size: 1.2rem;
		position: absolute;
		z-index: 9999;
		background-color: #fff;
	}
	.search-list-container {
		list-style-type: none;
		padding: 1rem;
		margin-top: 0px;
	}
	.search-list-container li {
		display: flex;
		margin-bottom: 0.5rem;
	}
	.search-img {
		width: 4rem;
		height: 100%;
	}
	.search-item {
		text-align: left;
		font-size: 1rem;
		margin: 0 0.5rem;
	}
	.m-t-none {
		margin-top: 0px;
	}
	.show-search-list-wrapper {
		position: absolute;
		height: 100%;
		margin-top: 2.5rem;
		margin-bottom: 5rem;
	}
	.search {
		position: fixed;
		z-index: 555;
		height: 100%;
	}
</style>