<template>
	<view class="wrap">
		<v-article-lists detail_path="/pages/article/detail" :items="items"></v-article-lists>
	</view>
</template>

<script>
import { articlesApi } from '@/api/article-comment'
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
			articlesApi(this.search).then((res) => {
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

</style>
