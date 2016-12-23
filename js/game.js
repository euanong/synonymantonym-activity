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
		for (var i = 0; i<this.synonyms.length; i++){
			testword = new Word(true,this.synonyms[i],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,this);
			testword.init();
			this.synels.push(testword);
		}
		for (var i = 0; i<this.antonyms.length; i++){
			testword = new Word(false,this.antonyms[i],boundsleft,boundsright,stage,this.synonymbox,this.antonymbox,this);
			testword.init();
			this.antels.push(testword);
		}
		stage.update();
	}
}