<template>
	<div class="loginform">

		<div>
			<input type="text" v-model="username" placeholder = "username ..">
		</div>

		<div>
			<input type="password" v-model="password" placeholder = "password .. ">
		</div>

		<div>
			<button @click="login">	login </button>
		</div>

	</div>
</template>

<script>

	module.exports = {
		ready : function(){
			//TODO remove after
			this.cmsAPI.login('admin', 'admin',
				function(){
					this.$route.router.go('/dashboard');
				}.bind(this));

		},
		methods : {
			login : function(){
				this.cmsAPI.login(this.username, this.password,
					function(){
						this.$route.router.go('/dashboard');
					}.bind(this));
			}
		},
		data : function(){
			return {
				username : '',
				password : '',
			}
		}
	}

</script>


<style lang="sass">
h1{
	color:black;
}
</style>
