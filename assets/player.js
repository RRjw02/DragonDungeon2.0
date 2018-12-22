Game.getPlayer = function(){
	return Game.player;
}
Game.getPlayerX = function(){
	return Game.player.x;
}
Game.getPlayerY = function(){
	return Game.player.y;
}
Game.getPlayerInventory = function(){
	return Game.player.inventory;
}
Game.getPlayerHealth = function(){
	return Game.player.health;
}
Game.addToInventory = function(item){
	Game.player.addToInventory(item);
	Game.Console.sendMessage("Added " + item.trueName + " to the players inventory!"); 
}
Game.setHealth = function(value){
	Game.player.health = value;
	Game.Console.sendMessage("Players health is now " + value);
}
Game.Player = {};
Game.Player.inventoryRefresh = function(){
	var inv = Game.player.inventory;
	var newinv = [];
	for(var i = 0; i < inv.length; i++){
		if(inv[i] != null){
			newinv.push(inv[i]);
		}
	}
	Game.player.inventory = newinv;
}
Game.getPlayerCoords = function(){
	return "X: " + Game.player.x + " Y: " + Game.player.y;
}