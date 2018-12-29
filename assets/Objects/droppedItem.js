Game.dropItem = function(x,y){
	var itemObj = new Game.GameObject(20,20,Game.File.getImageDirectory() + "droppedItem_texture.png",x,y,"droppedItem");
	itemObj.heldItem = Game.getRandomItem();
	Game.GameObjects.push(itemObj);
	Game.Console.sendMessage("droppedItem created at: X: " + itemObj.x + " Y: " + itemObj.y + " Containing: " + itemObj.heldItem.trueName);
}
Game.getDroppedItem = function(){
	var x = Game.player.x;
	var y = Game.player.y;
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].x == x && Game.GameObjects[i].y == y && Game.GameObjects[i].type == "droppedItem"){
			return Game.GameObjects[i].heldItem;
		}
	}
}
Game.onDroppedItem = function(){
	var x = Game.player.x;
	var y = Game.player.y;
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].x == x && Game.GameObjects[i].y == y && Game.GameObjects[i].type == "droppedItem"){
			return true;
		}
	}
	return false;
}