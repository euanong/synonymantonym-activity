function Word(synonym,text,boundsleft,boundsright,stage,synbox,antbox,game,speed){
	this.x = null;
	this.y = null;
	this.container = null;
	this.textMargin = 10;
	this.font = "30px Cutive Mono";
	this.charwidth = 18;
	//this font must be monospaced as you can't accurately calculate width in easel.js.
	//TODO: calculate charwidth from font to save measuring it.
	this.textColour = "#000";
	this.boxColour = "#FFDF38";
	this.boxWidth = null;
	this.boxHeight = 4/3*30+this.textMargin;
	this.rectangle = null;
	this.draggable = true;
	this.synonymbox = synbox;
	this.antonymbox = antbox;
	this.falling = true;
	this.endy = null;
	this.speed = null;
	this.passedBottom = false;

	this.createContainer = function(){
		this.container = new createjs.Container();
	}

	this.setContainerPosition = function(x,y){
		this.container.x = x;
		this.container.y = y;
		stage.addChild(this.container);
		stage.update();
	}

	this.processCollision = function(issynonym){
		if (synonym!=issynonym){
			//console.log("Wrong");
			game.lives -= 1;
			game.updatelivestext(game.lives);
			if (game.lives<=0){
				//console.log("dead");
				setTimeout(function(){g.restart(true);},1000);
			}
		} else {
			game.score += game.level;
			game.updatescoretext(game.score);
			//console.log("Right");
		}
		//console.log(this.synonymbox);
		//console.log(this.antonymbox);
		if (synonym) {
			this.synonymbox.addItem(this);
		} else {
			this.antonymbox.addItem(this);
		}
	}
	this.setTickerListener = function(){
		var c = this.container;
		var ca = stage.canvas.height;
		var g = game;
		var th = this;
		var f = function() {
			if (th.passedBottom == false){
				//console.log(c);
				//console.log(ca);
				if (c.y>ca){
					//console.log("passedBottom");
					//console.log(c.y);
					//console.log(ca);
					th.passedBottom = true;
					g.numbersorted += 1;
					g.lives -= 1;
					g.updatelivestext(g.lives);
					createjs.Tween.removeTweens(c);
					if (synonym) {
						th.synonymbox.addItem(th);
					} else {
						th.antonymbox.addItem(th);
					}
					if (g.lives<=0){
						console.log("dead");
						createjs.Ticker.removeEventListener("tick",f);
						setTimeout(function(){g.restart(true);},1000);
					}
					if (g.numbersorted==g.numberofitems){
						console.log("restart");
						createjs.Ticker.removeEventListener("tick",f);
						setTimeout(function(){g.restart(false);},1000);
					}
				}
			}
		}
		createjs.Ticker.addEventListener("tick", f);
	}
	this.setDragDropListeners = function(){
		var c = this.container;
		var d = this;
		var g = game;
		this.rectangle.on("mousedown", function (evt) {
			if (d.draggable==true){
				if (d.falling == true){
					d.falling = false;
					createjs.Tween.removeTweens(c);
				}
				this.offset = {x: c.x - evt.stageX, y: c.y - evt.stageY};
			}
		});
		this.rectangle.on("pressmove", function (evt) {
			if (d.draggable==true){
				if (d.falling == true){
					d.falling = false;
					createjs.Tween.removeTweens(c);
				}
				c.x = evt.stageX + this.offset.x;
				c.y = evt.stageY + this.offset.y;
			}
		});

		this.rectangle.on("pressup", function (evt) {
			if (d.draggable==true){
				//if (d.falling == true){
				//	d.falling = false;
				//	createjs.Tween.removeTweens(c);
				//}
				//console.log(c.x+(this.boxWidth/2));
				//console.log(c.y+(this.boxHeight/2));

				if (synbox.rectangle.contains(c.x,c.y)){
					//console.log("Item inside synonym");
					d.draggable = false;
					d.passedBottom = true;
					d.processCollision(true);
					g.numbersorted += 1;
					if (g.numbersorted==g.numberofitems){
						console.log("restart");
						setTimeout(function(){g.restart(false);},1000);
					}
				} else if (antbox.rectangle.contains(c.x,c.y)){
					//console.log("Item inside antonym");
					d.draggable = false;
					d.passedBottom = true;
					d.processCollision(false);
					g.numbersorted += 1;
					if (g.numbersorted==g.numberofitems){
						console.log("restart")
						setTimeout(function(){g.restart(false);},1000);
					}
				} else {
					d.falling = true;
					var distance = Math.abs(d.endy-c.y);
					var time = distance/d.speed*1000;
					//var time = 1000;
					//console.log(d.speed);
					//console.log(distance);
					//console.log(time);
					createjs.Tween.get(c).to({y: d.endy}, time);
				}
			}
		});

		this.rectangle.on("rollover", function (evt) {
			if (d.draggable==true){
				c.scaleX = c.scaleY = c.scale * 1.2;
			}
		});

		this.rectangle.on("rollout", function (evt) {
			if (d.draggable==true){
				c.scaleX = c.scaleY = c.scale;
			}
		});
	}

	this.getPosition = function(t,b,l,r){
		//console.log("---GETPOSITION---");
		//console.log(t);
		//console.log(b);
		//console.log(l);
		//console.log(r);
		var x,y;
		y = Math.random()*(b-t+1)+t;
		x = Math.random()*(r-l+1)+l;
		return [x,y];
	}

	this.init = function() {
		this.createContainer();
		var msg = new createjs.Text(text, this.font, this.textColour);
		msg.x = this.textMargin;
		msg.y = this.textMargin;

		var rectwidth = (this.charwidth*text.length)+(2*this.textMargin);
		var rect = new createjs.Shape();
		rect.graphics.beginFill(this.boxColour).drawRoundRect(0,0,rectwidth,this.boxHeight,this.textMargin);
		this.rectangle = rect;

		var top = 3*stage.canvas.height/4;
		var pos = this.getPosition(top,stage.canvas.height-this.boxHeight,boundsleft,boundsright-rectwidth);
		this.boxWidth = rectwidth;
		this.x = pos[0];
		this.endy = stage.canvas.height+10;
		this.y = -1*this.boxHeight;
		this.setContainerPosition(this.x,this.y);
		this.container.addChild(rect);
		this.container.addChild(msg);
		this.setDragDropListeners();

		//pixels per second
		this.speed = speed;
		var distance = Math.abs(this.endy-this.y);
		var time = distance/this.speed*1000;

		this.falling = true;
		this.passedBottom = false;
		this.setTickerListener();

        createjs.Tween.get(this.container).to({y: this.endy}, time);
		stage.update();
	}
}