Game.Demo = function(){
    //Clears the last loaded level
    Game.Level.clear();
    //Creates the outer wall
    Game.wallPrefix();
    //creates the background
    Game.createBackgroundPrefix();
    //This prevents a inventory bug
	Game.openInventory();
	Game.closeInventory();
	
	
}
