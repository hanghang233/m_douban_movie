<template>
	<transition name="fade">
		<div>
			<searchBox @searchMovie="searchMovie" v-if="searchFlag"></searchBox>
			<div v-if="!searchFlag">
				<div class="search-title">
					<span>{{title}}</span>
				</div>
				<ul class="search-list-container">
					<li v-for="item in movieList">
						<img class="search-img" :src="getPic(item.images.small)" />
						<div class="search-item">
							<p class="m-t-none">{{item.title}}</p>
							<p>
								<span v-if="item.rating">{{item.rating.average}} /</span>
								<span v-if="item.pubdates">{{item.pubdates[item.pubdates.length - 1]}}</span>
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import searchBox from '@/views/search/searchBox.vue'
	import movieListService from '@/service/movie-list.js' 
	export default {
		data() {
			return {
				start: 0,
				count: 10,
				movieList: [],
				searchFlag: true,
				title: ''
			}
		},
		methods: {
			searchMovie(tag) {
				var data = {
					'start': this.start,
					'count': this.count,
					'tag': tag
				}
				var _this = this;
				movieListService.searchList(data).then(function(res){
					_this.movieList = res.subjects;
					_this.searchFlag = false;
					_this.title = '关于' + tag + '的电影';
				})
			},
			getPic(url) {
				if(url) {
					var _u = url.substring(7);
					return 'https://images.weserv.nl/?url=' + _u;
				}else {
					return '';
				}
			}
		},
		components: {
			searchBox: searchBox
		}
	}
</script>

<style type="text/css">
	.fade-enter-active, .fade-leave-active {
		transition: all 1s ease
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}
	.search-title {
		width: 100%;
		height: 2rem;
		padding: 0.5rem 1.5rem;
		display: flex;
		align-items: flex-start;
		border-bottom: 1px solid #ccc;
		font-size: 1.2rem
	}
	.search-list-container {
		list-style-type: none;
		padding: 1rem;
		margin-top: 0px;
	}
	.search-list-container li {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.search-img {
		width: 4rem;
	}
	.search-item {
		text-align: left;
		font-size: 1rem;
		margin: 0 0.5rem;
	}
	.m-t-none {
		margin-top: 0px;
	}
</style>