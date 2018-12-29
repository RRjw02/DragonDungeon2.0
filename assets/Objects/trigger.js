/**
* Creates a trigger game object at x,y and can be visable and has a function that will be executed when hit
* @param {int} x - the x position of the trigger
* @param {int} y - the y position of the trigger
* @param {bool} isHidden - if the new trigger will be visable or hidden
* @param {function} triggeredFunction - code to be executed when collision
**/
Game.createTrigger = function(x,y,isHidden,triggeredFunction){
	var temp = new Game.GameObject(20, 20, "blue", x, y, "trigger", false);
	temp.triggerFunction = triggeredFunction;
	temp.isHidden = isHidden;
	Game.triggers.push(temp);	
}

Game.getTrigger = function(x,y){
	for(var i = 0; i < Game.triggers.length; i++){
		if(Game.triggers[i].type == "trigger" && Game.triggers[i].x == x && Game.triggers[i].y == y){
			return Game.triggers[i];
		}
	}
	return false;
}
Game.showAllTriggers = function(){
	for(var i = 0; i < Game.triggers.length; i++){
		Game.triggers[i].isHidden = false;
	}
}
Game.hideAllTriggers = function(){
	for(var i = 0; i < Game.triggers.length; i++){
		Game.triggers[i].isHidden = true;
	}
}