Game.levelZero = function(){
	Game.getCurrentMenu.current = "levelZero";
	//Player is 20pixels by 20pixles at (x,y) (0,120)
	Game.player.facing = "east";
	//BackGround
	Game.createBackgroundPrefix("grass.png");
	Game.openInventory();
	Game.closeInventory();
	
	Game.wallPrefix("dirt_texture.jpg");
	Game.createTree(60,100);
	Game.createTree(100,80);
	Game.createTree(60,160);
	Game.createTree(160,220);
	
	Game.createWall(960,120);
	Game.createWall(960,80);
	Game.createWall(980,120);
	Game.createWall(980,100);
	Game.createWall(980,80);
	Game.createWall(960,60);
	Game.createWall(960,40);
	Game.createWall(960,20);
	Game.createWall(960,140);
	Game.createWall(960,160);
	Game.createWall(960,180);
	Game.createBackground(940,80);
	Game.createBackground(940,100);
	Game.createBackground(940,120);
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 960, 100,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",99999,99999,"image");
}