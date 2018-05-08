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
						<img src="getPic(item.images.small)" />
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
	}
</style>