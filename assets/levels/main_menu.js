Game.mainMenu = function(){
	Game.Selected = "Start";
	Game.Text.text = "Dragon Dungeon 2: W/S to choose and A to select";
	Game.Background = new Game.GameObject(Game.myGameArea.getWidth(),Game.myGameArea.getHeight(),"assets/images/grass.png",0,0,"image");
	Game.menuSelector = new Game.GameObject(210,110,"red",50,50);
	Game.menuButton_startGame = new Game.GameObject(200,100,"black",50,50);
	Game.menuText_startGame.text = "Start Game";
	
	Game.menuButton_shop = new Game.GameObject(200,100,"black",50,200);
	Game.menuText_shop.text = "Store";
	
	//Game.player = new Game.GameObject(20, 20, "black", 950, 250);
}
