<template>
	<div>
		<input />
		<p>{{color.text}}</p>
		<p v-for="item in list" :key="item.id">{{item.id}}</p>
		<button @click="change()">change</button>
	</div>
</template>

<script type="text/javascript">
	export default  {
		data() {
			return {
				color: {
					text: '#ccc'
				},
				list: [{ 
					'id': 1
				},{ 
					'id': 2
				},{ 
					'id': 3
				},{ 
					'id': 4
				}]
			}
		},
		methods: {
			change() {
				this.color.text = '#42bd56';
				this.list.push({
					id: 6
				})
			}
		},
		created() {
			this.list[1].id = 55;
		}
	}
</script>