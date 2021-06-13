<template>
	<view class="wrap">
		<u-navbar title="My Article Lists">
			<view slot="right">
				<u-button type="primary" size="medium" :plain="true" @tap="gotoPublish">发新</u-button>
			</view>
		</u-navbar>
		<view v-for="item in items" v-bind:key="item.seq">
			<view class="u-body-item u-flex u-row-between u-p-b-0">
				<view class="u-body-item-title u-line-2">
					<navigator
						:url="'/pages/user/article/detail?seq='+item.seq"
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
import { infoApi } from '@/api/user'
export default {
	data() {
		return {
			items: [],
			search:{
				user_id: 0,
				page: 1,
				limit: 10
			},
			hast_next_page: false
		}
	},
	onShow(){
		this.loadUserInfo()
	},
	onLoad(e) {
		this.loadUserInfo().then(() => {
			this.loadData()
		})
	},
	onReachBottom(e){
		if(this.hast_next_page){
			this.search.page++
			this.loadData()
		}
	},
	methods:{
		async loadUserInfo(){
			infoApi().then(res => {
				console.log(res.data);
				this.search.user_id = res.data.user_id
			})
		},
		loadData(){
			this.hast_next_page = false
			indexApi(this.search).then((res) => {
				this.items = this.items.concat(res.data.items)
				if(res.data.items.length == this.search.limit){
					this.hast_next_page = true
				}
			})
		},
		gotoPublish(){
			console.log('gotoPublish start')
			this.$u.route('/pages/user/article/form')
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
