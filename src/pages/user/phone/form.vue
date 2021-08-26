<template>
	<view class="wrap">
		<!--  #ifdef  MP-WEIXIN -->
		<view>
			<u-button open-type="getPhoneNumber" type="success" @getphonenumber="doBindByWeixin">手机号码授权</u-button>
		</view>
		<!--  #endif -->
		<!--  #ifndef  MP-WEIXIN -->
		<view>
			<u-alert-tips type="warning" description="对不起，暂时只支持在微信小程序内绑定手机号"></u-alert-tips>
		</view>
		<!--  #endif -->

	</view>
</template>

<script>
import { phoneApi } from '@/api/user'

export default {
	data() {
		return {
		}
	},
	onLoad(e) {
	},
	onReady(){
	},
	methods:{
		doBindByWeixin(phone_data) {
			console.log(phone_data)
			if(!phone_data.detail || !phone_data.detail.encryptedData || !phone_data.detail.iv){
				return;
			}
			phoneApi({
				encrypted_data: phone_data.detail.encryptedData,
				iv: phone_data.detail.iv,
				type: 'mpWeixin'
			}).then((res) => {
				console.log(res)
				this.$u.route({type: 'back'})
			})
		}
  }
};
</script>
