<template>
	<view class="wrap">
		<!--  #ifndef  MP-WEIXIN -->
		<u-form :model="form" ref="uForm">
			<u-form-item prop="phone">
				<u-input v-model="form.phone" type="number" placeholder="请输入手机号" />
			</u-form-item>
			<u-form-item prop="captcha">
				<u-input v-model="form.captcha" type="captcha" placeholder="请输入验证码" />
				<view slot="right">
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="180" ref="captcha"
						@end="endCaptchaTime"
						@start="startCaptchaTime"
						@change="doChangeCaptcha"
					></u-verification-code>
					<u-button @click="doSendCaptcha" :disabled="captcha.is_sending">{{captcha.tip}}</u-button>
				</view>
			</u-form-item>
			<u-form-item prop="nick" v-if="is_first_login">
				<u-input v-model="form.nick" type="text" placeholder="请输入nick" />
			</u-form-item>
			<u-form-item>
				<u-button @click="doLogin" type="primary" class="button100">登陆</u-button>
			</u-form-item>
		</u-form>
		<!--  #endif -->
		<!--  #ifdef  MP-WEIXIN -->
		<view>
			<u-button open-type="getPhoneNumber" type="success" @getphonenumber="doLoginByWeixinPhone">使用微信手机号登录</u-button>
		</view>
		<!--  #endif -->
	</view>
</template>

<script>
import { isLogined } from '@/utils/auth'
import { loginApi } from '@/api/user'
import { captchaApi } from '@/api/phone'
export default {
	data() {
		const phone_rule	= [{
			required: true,
			pattern: /^[\d]+$/,
			transform(value) {
				return String(value);
			},
			message: '请输入有效的手机号'
		}]
		const captcha_rule	= [{
			required: true,
			message: '请输入的验证码'
		}]
		const nick_rule	= [{
			required: true,
			message: '请输入昵称'
		}]
		return {
			form: {
				phone: '',
				captcha: '',
				nick: '',
				type: 'phone'
			},
			is_first_login: false,
			rules: {
				captcha: {
					phone: phone_rule
				},
				form: {
					phone: phone_rule,
					captcha: captcha_rule,
					nick: nick_rule
				}
			},
			captcha:{
				tip: '',
				is_sending: false
			},
			login_to: {
				type: 'back',
				url: undefined
			}
		}
	},
	onLoad(e) {
		this.login_to = {
			type: e.totype || this.login_to.type,
			url: e.tourl || this.login_to.url
		}
		console.log('LOGIN OnLoad:', e)
	},
	onShow(){
		console.log('onShow')
		isLogined().then(() => {
			this.$u.route(this.login_to)
		})
	},
	onReady(){
		console.log('onReady')
		this.refCode = 'captcha'
	},
	methods:{
		doLogin(){
			let _this = this
			if(this.validate('form') == false){
				return false
			}
			loginApi(this.form).then((res) => {
				console.log(res)
				if(res.code == process.env.VUE_APP_CODE_SUCCESS){
					_this.$u.route(this.login_to)
				}
				console.log('LOGIN LoginApi:', this.login_to)
			})
		},
		doChangeCaptcha(text) {
			this.captcha.tip = text;
		},
		doSendCaptcha() {
			if(this.validate('captcha') == false){
				return false
			}

			if(this.$refs.captcha.canGetCode == false) {
				return this.$u.toast('倒计时结束后再发送');
			}

			this.captcha.is_sending = true;
			captchaApi({
				type: 'login',
				phone: this.form.phone
			}).then(res => {
				this.$refs.captcha.start();
				this.$u.toast('验证码已发送, 可能会有延迟，敬请谅解');
				this.is_first_login	= res.data.is_first_login
			})
		},
		doLoginByWeixinPhone(phone_data) {
			let _this = this
			console.log(phone_data)
			if(!phone_data.detail || !phone_data.detail.encryptedData || !phone_data.detail.iv){
				return;
			}
			loginApi({
				encrypted_data: phone_data.detail.encryptedData,
				iv: phone_data.detail.iv,
				type: 'mpWeixinPhone'
			}).then((res) => {
				_this.$u.route(_this.login_to)
				console.log('LOGIN Weixin LoginApi:', _this.login_to)
			})			
		},
		endCaptchaTime() {
			this.captcha.is_sending = false
		},
		startCaptchaTime() {
			this.captcha.is_sending = true
		},
		validate(type){
			let verify = false
			if(type == 'captcha'){
				this.$refs.uForm.setRules(this.rules.captcha)
				this.$refs.uForm.validate(valid => {
					verify = valid
				})
			}
			if(type == 'form'){
				this.$refs.uForm.setRules(this.rules.form)
				this.$refs.uForm.validate(valid => {
					verify = valid
				})
			}
			return verify
		}
	}
};
</script>

<style>
	.button100 {
		width: 100%;
	}
</style>
