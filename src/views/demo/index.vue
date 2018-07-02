<template>
	<div>
		<div v-if="showList.length > 0">
			<slider>
				<div v-for="item in showList">
					<img :src="item.image" />
				</div>
			</slider> 
		</div>
	</div>
</template>

<script type="text/javascript">
	import { createMovieList } from '@/common/util/movieList.js'
	import movieListService from '@/service/movie-list.js' 
	import slider from '@/base/slider/slider'
	export default {
		data() {
			return {
				showStartIndex: 1,
				count: 5,
				showList: [],
				mark: 1
			}
		},
		components: {
			slider: slider,
		},
		created() {
			var _this = this;
			var data = {
				'start': this.showStartIndex,
				'count': this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = createMovieList(res.subjects);
				
			})
		}
	}
</script>