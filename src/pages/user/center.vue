<template>
	<view class="">
		<view class="center">
			<view class="logo" :hover-class="is_login ? '' : 'logo-hover'">
				<image class="logo-img" :src="user.avatar" @tap="doChooseAvatar"></image>
				<view v-if="is_login"  class="logo-title">
					<navigator style="width:100%" :url="nick/form">
						<text class="user-name">{{ user.nick }}</text>
					</navigator>
				</view>
				<navigator v-else style="width:100%" hover-class="navigator-hover" url="login">
					<view class="logo-title">
							<text class="user-name">您未登录</text>
							<text class="go-login navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
			</view>
			<view class="center-list">
				<navigator style="width:100%" url="article/lists">
					<view class="center-list-item border-bottom">
							<text class="list-icon">&#xe60b;</text>
							<text class="list-text">我发布的博文</text>
							<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
				<navigator style="width:100%" url="article/lists-by-comment">
					<view class="center-list-item">
						<text class="list-icon">&#xe65f;</text>
						<text class="list-text">我评论的博文</text>
						<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
			</view>
			<view class="center-list">
				<view class="center-list-item">
					<text class="list-icon">&#xe614;</text>
					<text class="list-text">关于应用</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
			<view class="center-list btn-row">
				<u-button v-if="is_login" type="primary" @click="doLogout">退出登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { isLogined, clearToken, getToken, setUserInfo } from '@/utils/auth'
	import { infoApi, logoutApi, avatarApi } from '@/api/user'
	const init_user = {
		avatar: '../../static/img/logo.png',
		nick: ''
	}
	export default {
		data() {
			return {
				user: Object.assign({}, init_user),
        is_login: false,
				upload: {
					action: process.env.VUE_APP_UPLOAD_URL,
					header: {
						__USER_TOKEN__: getToken()
					}
				}
			}
		},
		onShow() {
			console.log('onShow')
			this.loadData()
		},
		onLoad() {
			console.log('onload')
			this.listenChooseAvatar()
		},
		methods: {
			loadData() {
				this.is_login = isLogined()
				this.upload.header.__USER_TOKEN__ = getToken()
				console.log(this.is_login)
				if(this.is_login == false){
					return false
				}
				infoApi().then(res => {
					console.log('USER-CENTER LoadData:', res)
					this.user = res.data
				})
			},
			listenChooseAvatar(){
				// 监听从裁剪页发布的事件，获得裁剪结果
				uni.$on('uAvatarCropper', (path) => {
					this.user.avatar = path
					// 可以在此上传到服务端
					uni.uploadFile({
						url: this.upload.action,
						header: this.upload.header,
						filePath: path,
						name: 'file',
						success: (e) => {
							const res = JSON.parse(e.data)
							avatarApi({avatar_id: res.data.id}).then(res=>{
								this.user.avatar = path
								setUserInfo(this.user)
							})
						}
					})
				})
			},
			doLogout(){
				logoutApi().then(res => {
					console.log('DoLogout.callback:', res)
					this.is_login = isLogined()
					console.log('DoLogout.is_login:', this.is_login)
					if(this.is_login == false ){
						console.log('DoLogout.init_user:', init_user)
						this.user = init_user
					}else{
						this.$u.toast('退出失败')
					}
				})
			},
			doChooseAvatar(){
				console.log('doChooseAvatar')
				if(!this.is_login){
					this.$u.route('/pages/user/login', {
							totype: 'switchTab',
							tourl: '/pages/user/center'
					})
					return
				}
				this.$u.route('/pages/user/avatar/u-avatar-cropper', {
					destWidth: '200',
					rectWidth: '200',
					fileType: 'png'
				})
			}
    },
		doChangeNick() {

		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	button {
		width: 98%;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #0faeff;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
	}

	.user-name {
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		color: #FFFFFF;
	}

	.login-title {
		height: 150rpx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		width: 750rpx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90rpx;
		width: 750rpx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0rpx 20rpx;
	}

	.border-bottom {
		border-bottom-width: 1rpx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #0faeff;
		text-align: center;
		font-family: texticons;
		margin-right: 20rpx;
	}

	.list-text {
		height: 90rpx;
		line-height: 90rpx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90rpx;
		width: 40rpx;
		line-height: 90rpx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
