<template>
	<main-header></main-header>
	<main-nav></main-nav>

	<div id="content">
		<div class="container">


			<div class="full">
				<h3>Last 31 days api calls</h3>

				<chartjs id="testchart" :data="chart30days"></chartjs>
			</div>

			<div class="half">
				<div>
				</div>
			</div>
			<div class="half">
				<div>
				</div>
			</div>

		</div>
	</div>
</template>


<script>
var component = {};

component.ready = function(){

	this.cmsAPI.getLast30DaysCount(function(doc){

		var labels = [];
		var data = [];
		var s = {a : 2, b : 3};
		var date = new Date();
		for (var key in doc){
			if(!doc.hasOwnProperty(key))
				continue;
			date.setTime(key);
			labels.push(date.toLocaleDateString('en-GB'));
			data.push(doc[key]);
		}

		/*
		var chrdocs = docs.reduce(function(previousValue, currentValue){
			previousValue.labels.push(currentValue.day);
			previousValue.series.push(currentValue.count);
			return previousValue;
		}, {labels : [], datasets: {data : []}});

		*/

		this.chart30days = {labels : labels, datasets : [{data: data}]};
	}.bind(this),function(err){console.log(err)});
}

component.data = function(){
	return {
		chart30days :  null,
		chartOptions : {
			height:'300px',
			width:'99%',
		}
	}
}

module.exports = component;

</script>


<style lang="sass">

</style>
