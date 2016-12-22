define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/wordbox','activity/word'], function (activity) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		runactivity();

	});

});

function runactivity(){
	var canvas;
	var stage;
	var synonymbox;
	var antonymbox;
	function init(){
		function makeText(word){
			var msg = new createjs.Text(word, '70px Crimson Text', '#999');
			var twidth = msg.getBounds().width;
			msg.x = centerX - (twidth/2);
			msg.y = 55;
			stage.addChild(msg);
			stage.update();
			msg.alpha = 1;
		}

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
	    makeText("abandon");
		var wordboxwidth = stage.canvas.width/4;
		var wordboxheight = stage.canvas.height;
		var synonymbox = new WordBox(true,wordboxwidth,wordboxheight,stage);
		synonymbox.init();
		var antonymbox = new WordBox(false,wordboxwidth,wordboxheight,stage);
		antonymbox.init();
		var testword = new Word(true,"relinquish",500,500,stage);
		testword.init();
		var testword2 = new Word(true,"resign",600,500,stage);
		testword2.init();
		var testword3= new Word(true,"forgo",700,500,stage);
		testword3.init();
		stage.update();
	}
    init();
}