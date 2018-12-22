Game.Start = function(){
	//Set all game settings before the game starts here!
	Game.Text = new Game.GameObject("30px", "Consolas", "black", 280, 40, "text");
	Game.menuText_startGame = new Game.GameObject("25px","Consolas","white",65,100,"text");
	Game.menuText_shop = new Game.GameObject("25px","Consolas","white",65,250,"text");
	Game.player = new Game.GameObject(20, 20, "black", 20, 120, "player");
	if(Game.AlreadyInMenu){
		Game.levelZero();
	}else{
		Game.mainMenu();
	}
	Game.myGameArea.start();
}

Game.getCurrentMenu = function(){
	this.current = "Main_Menu";
	return this.current;
}
Game.getCurrentSubMenu = function(){
	this.current = "none";
	return this.current;
}
Game.forceStart = function(){
	Game.myGameArea.start();
}
