define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/game','activity/wordbox','activity/word','activity/worddata'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		runactivity(act,doc);

	});

});

function runactivity(act,doc){
	var canvas;
	var stage;
	var g;

	function prepareJSON(_callback){
	    g.worddata = JSON.parse(data);
	    _callback();    
	}

	function init(){
		//console.log(doc);
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
	    var stopButton = doc.getElementById("stop-button");
        stopButton.addEventListener('click', function (e) {
        	console.log("close");
            act.close();
        });
	    g = new Game(stage, doc);
	    prepareJSON(function() {
	        console.log('Ready');
	        g.init();
	    });  
	    window.addEventListener('resize', resizeCanvas, false);
	    function resizeCanvas() {
	        canvas.width = window.innerWidth;
	        canvas.height = window.innerHeight-55;
	        stage.update();
	        g.resize();
	    }
	}
    init();
}