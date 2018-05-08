import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MovieList from '@/views/movie-list/index.vue'
import MovieDetail from '@/views/movie-detail/index.vue'
import Mine from '@/views/mine/index.vue'
import Ranking from '@/views/ranking/index.vue'
import commentAllList from '@/views/movie-detail/commentAllList.vue'
import reviewsAllList from '@/views/movie-detail/reviewsAllList.vue'
import Search from '@/views/search/index.vue'

Router.prototype.openPage = function(link){
	this.push(link);
}
 
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: MovieList
		},{
			path: '/movie',
			name: 'movie',
			component: MovieList
		},{
			path: '/moviedetail/:id',
			name: 'moviedetail',
			component: MovieDetail,
		},{
			path: '/mine',
			name: 'mine',
			component: Mine
		},{
			path: '/ranking',
			name: 'ranking',
			component: Ranking
		},{
			path: '/moviedetail/comment/:id',
			name: 'commentlist',
			component: commentAllList
		}{
			path: '/search',
			name: 'search',
			component: Search
		}
	]
})
