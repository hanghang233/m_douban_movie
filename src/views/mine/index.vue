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
			<div class="find-movie item2">
				<swiper :options="swiperOption" ref="mySwiper" style="width: 100%">
					<swiper-slide style="width: 100%">
						<bill-board-list :title="billTopObj.title" :list="billTopObj.list" v-if="billTopObj.title"></bill-board-list>
					</swiper-slide>
					<swiper-slide style="width: 100%">
						<bill-board-list :title="billWeekObj.title" :list="billWeekObj.list" v-if="billWeekObj.title"></bill-board-list>
					</swiper-slide>
					<swiper-slide style="width: 100%">
						<bill-board-list :title="billNorthObj.title" :list="billNorthObj.list" v-if="billNorthObj.title"></bill-board-list>
					</swiper-slide>
				</swiper> 
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
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import billBoardList from '@/views/mine/billBoardList.vue'
	import movieRakingService from '@/service/movie-ranking.js'
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
				showList: [],
				swiperOption: {
					  notNextTick: true,
				},
				billTopObj: {},
				billWeekObj: {},
				billNorthObj: {}
			}
		},
		components: {
			scroll,
			star,
			swiper,
			swiperSlide,
			billBoardList
		},
		methods: {
			initItem1Scroll() {
				var width = 0;
				this.$nextTick(function(){
					for(var i=0;i<this.showList.length;i++){
						width += parseInt(this.$refs.movieItem1[i].clientWidth);
					}
					this.$refs.movieItem1Content.style.width = width + 'px';
					if(!this.movieItem1Scroll){
						this.movieItem1Scroll = new BSscroll(this.$refs.movieWrapper1, options);
					}else{
						this.movieItem1Scroll.refresh();
					}
				})
			},
			getBillTopBoard() {
				//获取top250榜单
				var data1 = {
					'start': 0,
					'count': 4
				}
				var _this = this;
				movieRakingService.getTopMovieList(data1).then(function(res){
					_this.billTopObj = {
						'title': '豆瓣 Top250',
						'list': res.subjects
					}
				})
			},
			getBillWeekBoard() {
				//获取top250榜单
				var data1 = {
					'start': 0,
					'count': 4
				}
				var _this = this;
				movieRakingService.getWeekList(data1).then(function(res){
					_this.billWeekObj = {
						'title': '本周口碑榜',
						'list': _this.createSubject(res.subjects)
					}
				})
			},
			getBillNorthBord() {
				//获取top250榜单
				var data1 = {
					'start': 0,
					'count': 4
				}
				var _this = this;
				movieRakingService.getBookingList(data1).then(function(res){
					_this.billNorthObj = {
						'title': '本周北美榜',
						'list': _this.createSubject(res.subjects)
					}
				})
			},
			createSubject(arr) {
				arr.splice(4, arr.length - 4);
				var list = [];
				//组装list
				$.each(arr, function(index, item){
					list.push(item.subject);
				})
				return list;
			}
		},
		created() {
			var _this = this;
			this.getBillTopBoard();
			this.getBillWeekBoard();
			this.getBillNorthBord();
			var data = {
				'start': _this.showStartIndex,
				'count': _this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = createMovieList(res.subjects);
				_this.initItem1Scroll();
				
			})
		},
		computed: {
			swiper() {
		    	return this.$refs.mySwiper.swiper
		   }
		}
	}
</script>

<style type="text/css" lang="less">
	.wrapper {
		margin: 0.5rem 1rem;
		.find-movie {
			display: flex;
			flex-direction: column;
		}
		.item1 {
			min-height: 30rem;
		}
		.item2 {
			width: 100%;
			margin-bottom: 5rem;
		}
	}
	.text-gray {
		color: #ccc;
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
		position:absolute;
		width: 95%;
		margin-top: 2rem;
		overflow: hidden
	}
	.movie-item1-wrapper {
		padding-left: 0px;
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		li {
			width: 16%;
			min-width: 16%;
			margin-right: 0.6rem;
			margin-bottom: 0.6rem;
			position: relative;
			flex:1;
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