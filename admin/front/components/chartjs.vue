<style>
</style>

<template>
<div class="chart">
      <canvas class="chartjs" id="{{id}}">
      </canvas>
</div>
</template>


<script>

var chartConfig = {
      responsive:true,
      maintainAspectRatio : false,
      pointDotRadius : 6,
}

function getRandomColor(){
      var r = Math.floor(Math.random()*255);
      var g = Math.floor(Math.random()*255);
      var b = Math.floor(Math.random()*255);
      return 'rgba('+r+','+g+','+b+',0.2)';
}
var component = {};
component.methods = {};

component.ready = function(){
      this.update();
}

component.data = function(){
            return {
                  canvasContext : null,
                  chart : null,
            }
}
component.methods.update = function(){
      if(!this.chart && this.data){
            this.canvasContext = document.getElementById(this.id).getContext("2d");
            this.data.datasets.forEach(function(elem){
                  elem.fillColor = getRandomColor();
                  elem.strokeColor = getRandomColor();
                  elem.pointStrokeColor= "#fff";
                  elem.pointHighlightFill= "#fff";
                  elem.pointHighlightStroke= getRandomColor();
            });

            this.chart = new Chart(this.canvasContext).Line(this.data,chartConfig);
      }
      else if(this.chart){
            this.chart.update();
      }
}

component.watch = {
      data : 'update'
}

component.props = ['id','type', 'settings','data'];

module.exports = component;
</script>
