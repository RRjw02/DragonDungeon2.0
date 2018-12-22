Game.Demo = function(){
    //Clears the last loaded level
    Game.Level.clear();
    //Creates the outer wall
    Game.wallPrefix("brick_texture.png");
    //creates the background
    Game.createBackgroundPrefix("grass.png");
    //This prevents a inventory bug
	Game.openInventory();
	Game.closeInventory();
	
	
}
