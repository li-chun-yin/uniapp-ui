<template>
	<view>
		<view v-for="item in items" v-bind:key="item.seq">
			<view class="u-body-item u-flex u-row-between u-p-b-0">
				<view class="u-body-item-title u-line-2">
					<navigator
						:url="detail_path + '?seq=' + item.seq"
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
export default {
  name: 'v-article-lists',
  props: {
    items: {
      type: Array,
      default: []
    },
    detail_path: {
      type: String,
      default: '/pages/article/detail' 
    }
  },
	data() {
		return {
		}
	},
	methods:{
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
