<template>
	<view class="wrap">
		<movable-area scale-area class="movable-area">
			<movable-view direction="all" @scale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
				<image class="avatar" :src="user.avatar" mode="aspectFill" :scale="true"></image>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
import { infoApi } from '@/api/user'

const init_user = {
	avatar: 'https://cn.bing.com/th?id=OHR.PantheraTigris_ZH-CN3331361509_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
}
export default {
	data() {
		return {
			user: Object.assign({}, init_user),
			scale: 2,
			x: 0,
			y: 0,
			old: {
				x: 0,
				y: 0,
				scale: 2
			}
		}
	},
	onLoad(e) {
//		this.loadData()
	},
	methods:{
		loadData(){
			infoApi().then(res => {
				console.log('USER-AVATAR LoadData:', res)
				this.user = res.data
			})
		},
		onScale: function(e) {
			this.old.scale = e.detail.scale
		}
	}
};
</script>

<style>

.movable-area {
	background: #ccc;
}

</style>
