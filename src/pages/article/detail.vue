<template>
	<view class="wrap">
		<v-article-detail :request="request"></v-article-detail>
	</view>
</template>

<script>
export default {
	data() {
		return {
			request: {
				seq: 0
			}
		}
	},
	onLoad(e) {
		this.request = e
	},
	methods:{
	}
};
</script>

<style scoped lang="scss">

</style>
