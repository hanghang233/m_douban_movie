<template>
	<div>
		<div class="wrapper">
			<div class="find-movie item1">
				<div class="find-movie-item-title">
					<p class="find-movie-title">豆瓣热门</p>
					<p class="text-gray">99+ ></p>
				</div>
				<div class="movie-wrapper" ref="movieWrapper1">
					<ul class="movie-item1-wrapper" ref="movieItem1Content">
						<li v-for="item in showList" ref="movieItem1">
							<div>
								<img :src="item.image" />
								<span class="add-tag">+</span>
								<p class="movie-title">{{item.title}}</p>
								<star :star-total="item.rating" :need-rate-tag="false"></star>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import scroll from '@/base/scroll/scroll.vue'
	import movieListService from '@/service/movie-list.js' 
	import { createMovieList } from '@/common/util/movieList.js'
	import BSscroll from 'better-scroll'
	import star from '@/base/star/star.vue'
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
				showStartIndex: '0',
				count: 10,
				showList: []
			}
		},
		components: {
			scroll: scroll,
			star: star
		},
		methods: {
			initItem1Scroll() {
				var width = 0;
				this.$nextTick(function(){
					for(var i=0;i<this.showList.length;i++){
						width += parseInt(this.$refs.movieItem1[i].clientWidth + 5);
					}
					this.$refs.movieItem1Content.style.width = width + 'px';
					if(!this.movieItem1Scroll){
						this.movieItem1Scroll = new BSscroll(this.$refs.movieWrapper1, options);
					}else{
						this.movieItem1Scroll.refresh();
					}
				})
			}
		},
		created() {
			var _this = this;
			var data = {
				'start': _this.showStartIndex,
				'count': _this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = createMovieList(res.subjects);
				_this.initItem1Scroll();
				
			})
		},
	}
</script>

<style type="text/css" lang="less">
	.wrapper {
		margin: 0.5rem 1rem;
	}
	.text-gray {
		color: #ccc;
	}
	.find-movie {
		display: flex;
		flex-direction: column;
	}
	.find-movie-item-title {
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
		align-items: center;
	}
	.find-movie-title {
		font-weight: 900;
	}
	.movie-wrapper {
		position: absolute;
		width: 100%;
		margin-top: 2rem;
	}
	.movie-item1-wrapper {
		padding-left: 0px;
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		li {
			width: 18%;
			min-width: 18%;
			min-height: 18%;
			margin-right: 0.6rem;
			margin-bottom: 0.6rem;
			position: relative;
			img {
				width: 100%;
				height: 10rem;
			}
			.add-tag {
				position: absolute;
				width: 2rem;
				height: 2rem;
				display: inline-block;
				top: 0px;
				left: 0px;
				background: #cccccca3;
				font-size: 1.5rem;
				line-height: 2rem;
				color: #fff;
			}
			.movie-title {
				font-size: 0.8rem;
				font-weight: 900;
				width: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				margin: 0;
			}
		}
	}
</style>