<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm">
			<u-form-item prop="email">
				<u-input v-model="form.email" type="text" placeholder="请输入Email" />
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
					<u-button @tap="doSendCaptcha" :disabled="captcha.is_sending">{{captcha.tip}}</u-button>
				</view>
			</u-form-item>
			<u-form-item prop="nick" v-if="is_first_login">
				<u-input v-model="form.nick" type="text" placeholder="请输入nick" />
			</u-form-item>
			<u-form-item>
				<u-button @tap="doLogin" type="primary" class="button100">登陆</u-button>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
import { loginApi } from '@/api/user'
import { captchaApi } from '@/api/email'
export default {
	data() {
		const email_rule	= [{
			required: true,
			type: 'email',
			message: '请输入有效的Email'
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
				email: '',
				captcha: '',
				nick: ''
			},
			is_first_login: false,
			rules: {
				captcha: {
					email: email_rule
				},
				form: {
					email: email_rule,
					captcha: captcha_rule,
					nick: nick_rule
				}
			},
			captcha:{
				tip: '',
				is_sending: false
			},
			login_to: {
				type: 'switchTab',
				url: '/'
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
	onReady(){
		this.refCode = 'captcha'
	},
	methods:{
		doLogin(){
			if(this.validate('form') == false){
				return false
			}
			loginApi(this.form).then((res) => {
				this.$u.route(this.login_to)
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
				email: this.form.email
			}).then(res => {
				this.$refs.captcha.start();
				this.$u.toast('验证码已发送, 可能会有延迟，敬请谅解');
				this.is_first_login	= res.data.is_first_login
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
