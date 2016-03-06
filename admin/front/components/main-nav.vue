<template>
	<div id="main-nav">
		<ul>
			<li><a>Dashboard</a></li>
			<li><a v-link="{path : '/pages'}">Pages</a></li>
			<li><a>Users</a></li>
			<li><a>Profile</a></li>
			<li><a>Settings</a></li>
			<li><a>Options</a></li>
		</ul>
	</div>
</template>

<script>

</script>


<style lang="sass">
@import './../sass/global.scss';

#main-nav{
	ul{
		margin:0px;
		list-style:none;
		padding:0px;
	}
	li{
		padding: 10px 5px;
		&:hover,&.active{
			background-color:$secondary;
			a{
				color:black;
			}
		}

		a{
			color:white;
			font-size:20px;
		}
	}
}
</style>