<template>
	<div class="para-container">
		<ul class="para-content">
			<li v-for="(item, index) in list">
				<div>
					<img :src="getAvatar(item.author.avatar)" class="user-avatar">
				</div>
				<div class="des">
					<div class="info1">
						<span class="m-r" v-if="item.author">{{item.author.name}}</span>
						<star :star-total="item.rating.value" :need-average="false"></star>
						<span class="useful_count">{{item.useful_count}}</span>
					</div>
					<div class="info2">
						{{item.content}}
					</div>
					<div class="info3">
						{{item.created_at}}
					</div>
				</div>
			</li>
		</ul>
		<div class="all-para-count" v-if="count" @click="goList()">全部短评{{count}}个</div>
	</div>
</template>

<script type="text/javascript">
	import star from '@/base/star/star.vue'
	export default {
		props: {
			list: {
				type: Array,
			},
			count: {
				type: Number,
				default: 0
			},
			movieId: {
				type: String
			}
		},
		methods: {
			getAvatar(url) {
				var _u = url.substring( 7 );
        		return 'https://images.weserv.nl/?url=' + _u;
			},
			goList() {
				this.$emit('goReviewList');
			}
		},
		components: {
			star: star
		}
	}
</script>

<style type="text/css">
	.para-content {
		list-style-type: none;
		padding: 0px 70px;
	}
	.user-avatar {
		border-radius: 50%;
	}
	.para-content li {
		display: flex;
		margin-bottom: 70px;
		width: 100%;
		position: relative;
		font-size: 60px;
	}
	.des {
		display: flex;
		flex-direction: column;
		margin-left: 50px;
		width: 100%;
		text-align: left
	}
	.des > div {
		margin-bottom: 30px;
	}
	.info1 {
		display: flex;
		align-items: flex-end;
	}
	.m-r {
		margin-right: 50px;
	}
	.useful_count {
		position: absolute;
		right: 0px
	}
	.all-para-count {
		color: #42bd56;
		margin: 50px 0px;
	}
</style>