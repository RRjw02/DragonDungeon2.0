Game.levelTwo = function(){
	Game.getCurrentMenu.current = "levelTwo";
	Game.Demo();
	
	//Player is 20pixels by 20pixles at (x,y) (0,120)
	Game.player.x = 60;
	Game.player.y = 40;
	Game.player.facing = "east";
	//BackGround
	Game.createBackgroundPrefix();
	Game.openInventory();
	Game.closeInventory();
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 950, 100,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",60,20,"image");
	Game.createWall(40,20);
	Game.createWall(20,20);
	Game.createWall(80,20);
	Game.createWall(100,20);
}
