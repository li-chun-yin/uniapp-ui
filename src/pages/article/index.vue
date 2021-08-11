<template>
	<view class="wrap">
		<view v-for="item in items" v-bind:key="item.seq">
			<view class="u-body-item u-flex u-row-between u-p-b-0">
				<view class="u-body-item-title u-line-2">
					<navigator
						:url="'/pages/article/detail?seq='+item.seq"
						hover-class="navigator-hover"
					>{{item.desc}}</navigator>
				</view>
				<image :src="item.image.url" mode="aspectFill"></image>
			</view>
			<u-line margin="15rpx" />
		</view>
		<u-empty v-if="items.length == 0" class="top50"></u-empty>
	</view>
</template>

<script>
import { indexApi } from '@/api/article'
export default {
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
		},
		navigateToDetail(seq){
			this.$u.route({
				url: '/pages/article/detail?seq='+seq
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
