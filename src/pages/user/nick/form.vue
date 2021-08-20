<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" label-position="top">
			<u-form-item prop="nick" label="昵称">
				<u-input v-model="form.nick" type="text" placeholder="请输入昵称" />
			</u-form-item>
			<u-form-item>
				<u-button type="primary" :custom-style="{width:'100%'}" @click="doSubmit">提交</u-button>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
import { setUserInfo } from '@/utils/auth'
import { nickApi, infoApi } from '@/api/user'
export default {
	data() {
		return {
			user: {},
			form: {
				nick: ''
			},
			rules: {
				nick: [{
					required: true,
					max: 45,
					message: '请输入昵称，不能超过45个字符'
				}]
			},
		}
	},
	onLoad(e) {
		this.loadData()
	},
	onReady(){
	},
	methods:{
		loadData(){
			infoApi().then(res => {
				console.log('USER-CENTER LoadData:', res)
				this.user = res.data
				this.form.nick = res.data.nick
			})
		},
		validate() {
			let verify = false
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(valid => {
				verify = valid
				console.log(verify)
			})
			return verify
		},
		doSubmit() {
			if(this.validate() == false){
				return
			}
			nickApi(this.form).then(res=>{
				console.log(res)
				this.user.nick = this.form.nick
				setUserInfo(this.user)
				this.$u.route({type: 'back'})
			})
		}
  }
};
</script>
