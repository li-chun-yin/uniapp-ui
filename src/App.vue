<script>
	import { loginApi } from '@/api/user'

	export default {
		onLaunch: function() {
			console.log(process.env.NODE_ENV)
			console.log('App Launch')

			// #ifdef MP-WEIXIN	
			let doLoginByWeixin = () => {
				let _this = this
				uni.login({
					success(code_data) {
						loginApi({
							code: code_data.code,
							type: 'mpWeixin'
						}).then((res) => {
							console.log(res)
							console.log('LOGIN Weixin LoginApi:', _this.login_to)
						}).catch(err => {
							console.log('onLaunch.doLoginByWeixin', err)
							setTimeout(()=>{
								doLoginByWeixin()
							}, 800) // 微信1分钟内不能超过100个请求
						})
					},
					fail(e) {
						setTimeout(()=>{
							doLoginByWeixin()
						}, 800) // 微信1分钟内不能超过100个请求
					}
				})
			}
			doLoginByWeixin()
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}		
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	.wrap {
		padding: 24rpx;
	}
</style>
