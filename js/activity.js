define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/game','activity/wordbox','activity/word','activity/worddata'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		runactivity(act);

	});

});

function runactivity(act){
	var canvas;
	var stage;
	var g;
	function init(){
		console.log(act);
		canvas = document.getElementById('actualcanvas');
    	canvas.width = window.innerWidth; 
    	canvas.height = window.innerHeight-55;
    	centerX = canvas.width/2;
    	centerY = (canvas.height-55)/2;
    	stage = new createjs.Stage(canvas);
    	stage.mouseEventsEnabled = true;
    	createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick() {
		    stage.update();
		}
		window.addEventListener('resize', resizeCanvas, false);
	    function resizeCanvas() {
	            canvas.width = window.innerWidth;
	            canvas.height = window.innerHeight-55;
	            stage.update();
	    }
	    g = new Game(stage);
	    g.init();
	}
    init();
}