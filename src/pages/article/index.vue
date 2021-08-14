<template>
	<view class="wrap">
		<v-article-lists :items="items" detail_path="/pages/article/detail"></v-article-lists>
	</view>
</template>

<script>
import { indexApi } from '@/api/article'
import vArticleLists from '../../components/v-article-lists/v-article-lists.vue';
export default {
  components: { vArticleLists },
	data() {
		return {
			items: [],
			search:{
				page: 1,
				limit: 10
			},
			hast_next_page: false
		}
	},
	onLoad(e) {
		this.loadData()
	},
	onReachBottom(e){
		if(this.hast_next_page){
			this.search.page++
			this.loadData()
		}
	},
	methods:{
		loadData(){
			this.hast_next_page = false
			indexApi(this.search).then((res) => {
				console.log(res)
				this.items = this.items.concat(res.data.items)
				if(res.data.items.length == this.search.limit){
					this.hast_next_page = true
				}
			})
		}
	}
};
</script>

<style scoped lang="scss">
	.top50 {
		padding-top: 50rpx;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
