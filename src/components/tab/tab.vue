<template>
	<div class="tab-container">
		<ul class="tab-ul">
			<li @click="open('/movie', 0)" :class="{'active': isActive(0)}">
				<span class="tab-icon">
					<i class="icon-video-camera"></i>
				</span>
				<span>热映</span>
			</li>
			<li @click="open('/ranking', 1)" :class="{'active':isActive(1)}">
				<span class="tab-icon">
					<i class="icon-stats-bars"></i>
				</span>
				<span>排行</span>
			</li>
			<li @click="open('/mine', 2)" :class="{'active':isActive(2)}">
				<span class="tab-icon">
					<i class="icon-video-camera"></i>
				</span>
				<span>我的</span>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'tab',
		data() {
			return {
				nowIndex: 0,
			}
		},
		methods: {
			open(name, index) {
				this.$router.openPage(name);
				this.nowIndex = index;
			},
			isActive(index) {
				return index == this.nowIndex
			}
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/variable.styl"
	.tab-container {
		
	}
	.tab-ul {
		display: flex;
		justify-content: space-around;
		list-style-type: none;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #42bd56;
		width: 100%;
		padding-left: 0px;
		align-items: center;
		margin-top: 0px;
		margin-bottom: 0px;
		height: 200px
	}
	.active {
		color: #42bd56
	}
</style>