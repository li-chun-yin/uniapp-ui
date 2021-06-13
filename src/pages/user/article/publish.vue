<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" label-position="top">
			<u-form-item prop="title" label="标题">
				<u-input v-model="form.title" type="text" placeholder="请输入标题" />
			</u-form-item>
      <u-form-item prop="desc" label="简介">
				<u-input v-model="form.desc" type="desc" placeholder="请输入对文章内容的基本描述" />
			</u-form-item>
			<u-form-item prop="image" label="缩略图">
				<u-upload width="160" height="160" max-count="1"
					:action="upload.action"
					@on-uploaded="changeImage"
				></u-upload>
			</u-form-item>
      <u-form-item prop="content" label="内容">
				<v-editor placeholder="请输入内容" v-model="form.content"
					:upload_url="upload.action"
				></v-editor>
			</u-form-item>
			<u-form-item>
				<u-button type="primary" class="login-button" @tap="doPublish">发布</u-button>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
import { createApi } from '@/api/article'
export default {
	data() {
		return {
			form: {
				title: '',
				desc: '',
				content: '',
				image: {id: 0, url: ''}
			},
			rules: {
				title: [{
					required: true,
					max: 45,
					message: '请输入标题，不能超过45个字符'
				}],
				desc: [{
					required: true,
					max: 200,
					message: '请输入标题，不能超过200个字符'
				}],
				content: [{
					required: true,
					message: '请输入内容'
				},{
					max: 65535,
					message: '博文内容超长，您可以将一篇博文拆分成几（上下）篇发布'
				}]
			},
			upload: {
				action: process.env.VUE_APP_UPLOAD_URL,
				lists: []
			}
		}
	},
	onLoad(e) {
	},
	onReady(){
	},
	methods:{
		changeImage(lists, name) {
			this.image	= lists[0].response.data
			console.log('this.image:', this.image)
			console.log('lists:', lists, lists[0], lists[0].response)
		},
		doPublish() {
			console.log('image', this.form.image)
			console.log('content', this.form.content)
			let verify = false
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(valid => {
				verify = valid
				console.log(verify)
			})
			console.log(this.$refs.uForm)
			if(verify == false){
				return
			}
			createApi(this.form).then(res=>{
				const seq = res.data.seq
				this.$u.route('/pages/user/article/detail', {seq})
			})
		}
  }
};
</script>

<style>
	.login-button {
		width: 100%;
	}
</style>
