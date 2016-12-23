function Game(stage){
	this.wordsLoaded = false;
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

	this.getWordStore = function(){
		var obj_keys = Object.keys(this.worddata);
				var random = obj_keys[Math.floor(Math.random() *obj_keys.length)];
				console.log(random);
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
		console.log("drop");
		var wordnow;
		wordnow = th.allitems.pop();
		wordnow.init();
		if (th.allitems.length >= 1){
			var randomtime = Math.floor(Math.random()*upperbounds)+lowerbounds;
			console.log(randomtime);  
			setTimeout(function(){th.dropItems(lowerbounds,upperbounds)}, randomtime);
		}
	}

	this.restart = function() {
		console.log("restart");
		var th = this;
		stage.removeAllChildren();
		stage.update();
		th.init();
	}

	this.init = function() {
		if (this.wordsLoaded==false){
			this.worddata = JSON.parse(data);
			this.wordsLoaded = true;
		}
		this.getWordStore();
		this.makeText(this.wordused);
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
			testword = new Word(true,this.synonyms[i],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,g);
			this.allitems.push(testword);
		}
		for (var i = 0; i<this.antonyms.length; i++){
			testword = new Word(false,this.antonyms[i],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,g);
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
		setTimeout(function(){th.dropItems(lowerbounds,upperbounds)}, randomtime);
		stage.update();
	}
}