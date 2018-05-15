<template>
	<div>
		<ul class="rank-image">
			<li v-for="(item, index) in list" :class="'image-item' + index" >
				<img :class="'rank-image-item' + index" v-if="item.images || item.subject" :src="getImage(item)" />
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			list: {
				type: Array,
				default: true
			}
		},
		methods: {
			getImage(item) {
				if(item.subject) {
					var url = item.subject.images.small;
					var _u = url.substring(7);
					return 'https://images.weserv.nl/?url=' + _u;
				}else if(item.images){
					var url = item.images.small;
					var _u = url.substring(7);
					return 'https://images.weserv.nl/?url=' + _u;
				}
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.image-item {
		width: 4.5rem;
	}
	.rank-image {
		list-style-type: none;
		position: relative;
		width: 9rem;
		height: 6.5rem;
		margin: 0px 0.5rem 0px 2rem;
	}
	.rank-image li {
		display: inline-block;
		position: absolute;
	}
	.image-item0 {
		left: 0px;
		top: 0.4rem;
	}
	.image-item1 {
		left: 3rem;
		z-index: 9999;
	}
	.image-item2 {
		right: 0px;
		top: 0.4rem;
	}
	.rank-image-item0 {
		width: 4rem;
	}
	.rank-image-item1 {
		.image-item;
	}
	.rank-image-item2 {
		width: 4rem;
	}
</style>