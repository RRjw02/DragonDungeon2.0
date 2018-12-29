Game.createChest = function(x,y,contents){
	Game.chests.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "chest_texture.png",x,y,"chest"));
	var obj = Game.chests[Game.chests.length - 1];
	//Game.Console.sendMessage("Chest created at: X: " + obj.x + " Y: " + obj.y);
	for(var i = 0; i < contents.length; i++){
		Game.chests[Game.chests.length - 1].setContents(contents[i]);
	}
}
Game.getChest = function(x,y){
	for(var i = 0; i < Game.chests.length; i++){
		if(Game.chests[i].type == "chest" && Game.chests[i].x == x && Game.chests[i].y == y){
			return Game.chests[i];
		}
	}
	return false;
}
Game.checkChest = function(num){
	if(Game.getChest(Game.player.x,Game.player.y) != null && Game.getChest(Game.player.x,Game.player.y).getContents(num ) != null){
		return Game.getChest(Game.player.x,Game.player.y).getContents(num).trueName;
	}else{
		return "Empty";
	}
	
}