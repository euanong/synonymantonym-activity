function Word(synonym,text,x,y,stage){
	this.x = x;
	this.y = y;
	this.container = null;
	this.centrex = null;
	this.centrey = null;
	this.textMargin = 10;
	this.font = "30px Cutive Mono";
	this.charwidth = 18;
	//this font must be monospaced as you can't accurately calculate width in easel.js.
	//TODO: calculate charwidth from font to save measuring it.
	this.textColour = "#000";
	this.boxColour = "#FFDF38";
	this.boxHeight = 4/3*30+this.textMargin;
	this.rectangle = null;

	this.createContainer = function(x,y){
		this.container = new createjs.Container();
		this.container.x = x;
		this.container.y = y;
		stage.addChild(this.container);
		stage.update();
	}

	this.setDragDropListeners = function(){
		var c = this.container;
		this.rectangle.on("mousedown", function (evt) {
			this.offset = {x: c.x - evt.stageX, y: c.y - evt.stageY};
		});
		this.rectangle.on("pressmove", function (evt) {
			c.x = evt.stageX + this.offset.x;
			c.y = evt.stageY + this.offset.y;
		});

		this.rectangle.on("rollover", function (evt) {
			c.scaleX = c.scaleY = c.scale * 1.2;
		});

		this.rectangle.on("rollout", function (evt) {
			c.scaleX = c.scaleY = c.scale;
		});
	}

	this.init = function() {
		this.createContainer(x,y);
		var msg = new createjs.Text(text, this.font, this.textColour);
		msg.x = this.textMargin;
		msg.y = this.textMargin;
		console.log(msg);
		var rectwidth = (this.charwidth*text.length)+(2*this.textMargin);
		console.log(rectwidth);
		//radius is the textmargin
		var rect = new createjs.Shape();
		rect.graphics.beginFill(this.boxColour).drawRoundRect(0,0,rectwidth,this.boxHeight,this.textMargin);
		console.log(rect);
		this.rectangle = rect;
		this.container.addChild(rect);
		this.container.addChild(msg);
		var bounds = msg.getBounds();
		var rectwidth = bounds.width+(2*this.textMargin)+25;
		console.log(rectwidth);
		this.setDragDropListeners();
		stage.update();
	}
}