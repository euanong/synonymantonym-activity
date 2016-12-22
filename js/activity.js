define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/wordbox','activity/word','activity/worddata'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		runactivity(act);

	});

});

function runactivity(act){
	var canvas;
	var stage;
	var synonymbox;
	var antonymbox;	
	var wordused;
	var synonyms;
	var synels = [];
	var antonyms;
	var antels = [];
	var worddata;
	function getWordStore(){
		var obj_keys = Object.keys(worddata);
        var random = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        console.log(random);
        wordused = random;
        synonyms = worddata[random]["synonyms"];
        antonyms = worddata[random]["antonyms"];
	}

	function makeText(word){
		var msg = new createjs.Text(word, '70px Crimson Text', '#999');
		var twidth = msg.getBounds().width;
		msg.x = centerX - (twidth/2);
		msg.y = 55;
		stage.addChild(msg);
		stage.update();
		msg.alpha = 1;
	}

	function init(){
		console.log(act);
		worddata = JSON.parse(data);
		getWordStore();
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
	    makeText(wordused);

		var wordboxwidth = stage.canvas.width/4;
		var wordboxheight = stage.canvas.height;
		var synonymbox = new WordBox(true,wordboxwidth,wordboxheight,stage);
		synonymbox.init();
		var antonymbox = new WordBox(false,wordboxwidth,wordboxheight,stage);
		antonymbox.init();
		var boundsleft = synonymbox.x+wordboxwidth;
		var boundsright = antonymbox.x;
		var testword;
		for (var i = 0; i<synonyms.length; i++){
			testword = new Word(true,synonyms[i],boundsleft,boundsright,stage,synonymbox,antonymbox);
			testword.init();
			synels.push(testword);
		}
		for (var i = 0; i<antonyms.length; i++){
			testword = new Word(false,antonyms[i],boundsleft,boundsright,stage,synonymbox,antonymbox);
			testword.init();
			antels.push(testword);
		}
		stage.update();
	}
    init();
}