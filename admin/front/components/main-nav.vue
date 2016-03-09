<template>
	<div id="main-nav">
		<ul>
			<li><a v-link="{path : '/dashboard'}">Dashboard<img src="./../img/graphic.png"></a></li>
			<li><a v-link="{path : '/pages'}">Pages<img src="./../img/two.png"></a></li>
			<li><a>Users<img src="./../img/people-1.png"></a></li>
			<li><a>Profile<img src="./../img/people.png"></a></li>
			<li><a v-link="{path : '/settings'}">Settings<img src="./../img/cogwheel.png"></a></li>
			<li><a>Options<img src="./../img/symbol.png"></a></li>
		</ul>
	</div>
</template>

<script>

</script>


<style lang="sass">
@import './../sass/global.scss';

#main-nav{
	background-color:black;

	ul{
		margin:0px;
		list-style:none;
		padding:0px;
	}
	li{
		padding: 5px 0px 5px 15px;
		border-bottom:1px solid white;
		background-color:$darkbackground;
		&:hover,&.active{
			background-color:$darkbackgroundalternate;
			a{
				color:black;
			}
		}

		a{
			text-decoration:none;
			position:relative;
			display:block;
			color:black;
			font-size:16px;
			width:100%;

			img{
				position:absolute;
				right:5px;
				height:100%;

			}
		}
	}
}
</style>
