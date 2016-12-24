function Game(stage, doc){
	//this.wordsLoaded = false;
	this.synonyms = null;
	this.antonyms = null;
	this.synonymbox = null;
	this.antonymbox = null;	
	this.wordused = null;
	this.synonyms = null;;
	this.synels = null;
	this.antonyms = null;
	this.antels = null;
	this.worddata = null;
	this.titletext = null;
	this.allitems = [];
	this.numberofitems = null;
	this.numbersorted = null;
	this.lives = 5;
	this.timeout = null;
	this.initialSpeed = 70;
	this.speed = this.initialSpeed;
	this.level = 1;
	this.levelboxcontainer = null;
	this.livesboxcontainer = null;
	this.livestext = null;
	this.speedIncreaseFactor = 1.2;
	this.score = 0;

	this.getWordStore = function(){
		var obj_keys = Object.keys(this.worddata);
		var random = obj_keys[Math.floor(Math.random() *obj_keys.length)];
		//console.log(random);
		this.wordused = random;
		this.synonyms = this.worddata[random]["synonyms"];
		this.antonyms = this.worddata[random]["antonyms"];
	}

	this.makeText = function(word){
		var msg = new createjs.Text(word, '70px Crimson Text', '#999');
		var twidth = msg.getBounds().width;
		msg.x = centerX - (twidth/2);
		msg.y = 55;
		stage.addChild(msg);
		stage.update();
		msg.alpha = 1;
		this.titletext = msg;
	}

	this.shuffleAllItems = function(){
		var array = this.allitems;
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
		 	array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		this.allitems = array;
	}

	this.dropItems = function(lowerbounds,upperbounds){
		var th = this;
		//console.log("drop");
		var wordnow;
		wordnow = th.allitems.pop();
		wordnow.init();
		if (th.allitems.length >= 1){
			var randomtime = Math.floor(Math.random()*upperbounds)+lowerbounds;
			//console.log(randomtime);  
			this.timeout = setTimeout(function(){th.dropItems(lowerbounds,upperbounds)}, randomtime);
		}
	}

	this.restart = function(dead) {
		console.log("restart");
		//if dead set speed and level to original
		if (dead==true){
			this.speed = this.initialSpeed;
			this.level = 1;
			this.lives = 5;
			this.score = 0;
		} else {
			this.level++;
			this.lives++;
			this.speed *= this.speedIncreaseFactor;
		}
		var th = this;
		stage.removeAllChildren();
		stage.update();
		createjs.Ticker.removeAllEventListeners();
		createjs.Ticker.addEventListener("tick", handleTick);
		createjs.Ticker.addEventListener("tick", createjs.Tween);
		var st = stage;
		function handleTick() {
		    st.update();
		}
		if (th.timeout!=null){
			clearTimeout(th.timeout);
			clearTimeout(th.timeout);
		}
		th.init();
		//setTimeout(function(){th.init();},500);
	}

	this.makelevelbox = function(level) {
		var textmargin = 10;
		var levelheight = 40;

		this.levelboxcontainer = new createjs.Container();
		this.levelboxcontainer.x = 3.5*stage.canvas.width/12;
		this.levelboxcontainer.y = 50;
		stage.addChild(this.levelboxcontainer);
		stage.update();

		var leveltext = new createjs.Text("Level:","25px Open Sans", "#000");
		var msg = new createjs.Text(level.toString(), "30px Open Sans", "#000");
		
		var rectwidth = 70;
		var twidth = msg.getBounds().width;
		msg.x = (rectwidth/2)-(twidth/2);
		msg.y = levelheight+textmargin;
		
		var rect = new createjs.Shape();
		rect.graphics.beginFill("#FFF").drawRoundRect(0,0,rectwidth,rectwidth,textmargin);
		rect.graphics.beginStroke("#000");
		rect.graphics.setStrokeStyle(5);
		rect.snapToPixel = true;
		rect.graphics.drawRoundRect(0,0,rectwidth,rectwidth,textmargin);
		rect.x=0;
		rect.y=levelheight;
		this.levelboxcontainer.addChild(rect);
		this.levelboxcontainer.addChild(msg);
		this.levelboxcontainer.addChild(leveltext);
		stage.update();
	}

	this.makelivesbox = function(lives) {
		var textmargin = 10;
		var livesheight = 40;
		var rectwidth = 70;

		this.livesboxcontainer = new createjs.Container();
		this.livesboxcontainer.x = 8.5*stage.canvas.width/12-rectwidth;
		this.livesboxcontainer.y = 50;
		stage.addChild(this.livesboxcontainer);
		stage.update();

		var ltext = new createjs.Text("Lives:","25px Open Sans", "#000");
		var msg = new createjs.Text(lives.toString(), "30px Open Sans", "#000");
		
		var twidth = msg.getBounds().width;
		msg.x = (rectwidth/2)-(twidth/2);
		msg.y = livesheight+textmargin;
		
		var rect = new createjs.Shape();
		rect.graphics.beginFill("#FFF").drawRoundRect(0,0,rectwidth,rectwidth,textmargin);
		rect.graphics.beginStroke("#000");
		rect.graphics.setStrokeStyle(5);
		rect.snapToPixel = true;
		rect.graphics.drawRoundRect(0,0,rectwidth,rectwidth,textmargin);
		rect.x=0;
		rect.y=livesheight;
		this.livesboxcontainer.addChild(rect);
		this.livesboxcontainer.addChild(msg);
		this.livesboxcontainer.addChild(ltext);
		this.livestext = msg;
		stage.update();
	}

	this.updatelivestext = function(lives) {
		this.livestext.text = lives.toString();
		stage.update();
	}

	this.updatescoretext = function(score) {
		var scoreel = doc.getElementById("score");
		//console.log(scoreel);
		//console.log(score);
		scoreel.innerHTML = "Score: "+score.toString();
	}

	this.init = function() {
		this.synonyms = null;
		this.antonyms = null;
		this.synonymbox = null;
		this.antonymbox = null;	
		this.wordused = null;
		this.synonyms = null;
		this.synels = null;
		this.antonyms = null;
		this.antels = null;
		this.titletext = null;
		this.allitems = [];
		this.numberofitems = null;
		this.numbersorted = null;
		this.levelboxcontainer = null;
		//if (this.wordsLoaded==false){
		//	this.worddata = JSON.parse(data);
		//	this.wordsLoaded = true;
		//}
		this.getWordStore();
		this.makeText(this.wordused);
		this.makelevelbox(this.level);
		this.makelivesbox(this.lives);
		this.updatescoretext(this.score);

		var wordboxwidth = stage.canvas.width/4;
		var wordboxheight = stage.canvas.height;
		this.synonymbox = new WordBox(true,wordboxwidth,wordboxheight,stage);
		this.synonymbox.init();
		this.antonymbox = new WordBox(false,wordboxwidth,wordboxheight,stage);
		this.antonymbox.init();
		var boundsleft = this.synonymbox.x+wordboxwidth;
		var boundsright = this.antonymbox.x;
		var testword;
		this.synels = [];
		this.antels = [];
		this.allitems = [];
		var g = this;
		for (var i = 0; i<this.synonyms.length; i++){
			testword = new Word(true,this.synonyms[i],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,g,this.speed);
			this.allitems.push(testword);
		}
		for (var j = 0; j<this.antonyms.length; j++){
			testword = new Word(false,this.antonyms[j],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,g,this.speed);
			this.allitems.push(testword);
		}
		this.numberofitems = this.allitems.length;
		this.numbersorted = 0;
		this.shuffleAllItems();
		//bounds for timer in ms
		var lowerbounds = 500;
		var upperbounds = 2000;
		var randomtime = Math.floor(Math.random()*upperbounds)+lowerbounds;
		var th = this;  
		th.timeout = setTimeout(function(){th.dropItems(lowerbounds,upperbounds)}, randomtime);
		stage.update();
	}
}