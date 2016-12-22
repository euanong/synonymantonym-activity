function WordBox(synonym,width,height,stage){
	this.x = 0;
	this.y = 0;
	this.colour = null;
	this.rectangle = null;
	this.container = null;
	this.text = "";
	this.width = width;
	this.titleFont = "30px Open Sans";
	this.titleColour = "#FFFFFF";
	this.synonymBoxColour = "#1EB025";
	this.antonymBoxColour = "#FF0000";
	this.synonymText = "Synonyms";
	this.antonymText = "Antonyms";
	this.lowestItem = 100;
	this.itemMargin = 10;

	this.addItem = function(word) {
		//add item at this.lowestitem, then add item depth + item margin to it
		console.log(word);
		var twidth = word.boxWidth;
		word.x = this.x+(this.width/2)-(twidth/2);
		word.y = this.lowestItem;
		word.container.x = word.x;
		word.container.y = word.y;
		console.log(word.x);
		console.log(word.y);
		this.lowestItem+=word.boxHeight+this.itemMargin;
		stage.update();
	}

	this.createRectangle = function(w,h,x,y) {
		console.log("make rectangle");
		console.log(w);
		console.log(h);
		console.log(x);
		console.log(y);
		//make rectangle
		this.rectangle = new createjs.Rectangle(x,y,w,h);
		//draw rectangle
		var rect = new createjs.Shape();
		rect.graphics.beginFill(this.colour).drawRect(x,y,w,h);
		stage.addChild(rect);
		stage.update();
	}

	this.createContainer = function(x,y){
		this.container = new createjs.Container();
		this.container.x = x;
		this.container.y = y;
		stage.addChild(this.container);
		stage.update();
	}

	this.addTextToContainer = function(text){
		var msg = new createjs.Text(text, this.titleFont, this.titleColour);
		var twidth = msg.getBounds().width;
		msg.x = (this.width/2)-(twidth/2);
		msg.y = 35;
		console.log(msg);
		this.container.addChild(msg);
		stage.update();
		msg.alpha = 1;
	}

	this.init = function(){
		console.log("synonym");
		console.log(synonym);
		if (synonym==false){
			console.log("antonym");
			this.x = (stage.canvas.width)-width;
			this.colour = this.antonymBoxColour;
			this.text = this.antonymText;
		} else {
			this.x = 0;
			this.colour = this.synonymBoxColour;
			this.text = this.synonymText;
		}
		this.createRectangle(width,height,this.x,this.y);
		this.createContainer(this.x,this.y);
		this.addTextToContainer(this.text);
	}
}