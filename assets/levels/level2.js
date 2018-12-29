Game.levelTwo = function(){
	Game.getCurrentMenu.current = "levelTwo";
	Game.Level.clear();
	Game.Teleport(60,40);
	Game.wallPrefix();
	Game.player.facing = "east";
	//BackGround
	Game.createBackgroundPrefix();
	Game.openInventory();
	Game.closeInventory();
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 80, 220,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",60,20,"image");
	Game.createWall(40,20);
	Game.createWall(20,20);
	Game.createWall(80,20);
	Game.createWall(100,20);
	Game.createWall(120,20);
	Game.createWall(120,40);
	Game.createWall(120,60);
	Game.createWall(120,80);
	Game.createWall(120,100);
	Game.createWall(100,100);
	Game.createWall(80,100);
	Game.createWall(60,100);
	Game.createWall(40,100);
	Game.createDoor(20,100);
	Game.createWall(100,120);
	Game.createWall(100,140);
	Game.createWall(100,160);
	Game.createWall(100,180);
	Game.createWall(100,200);
	Game.createWall(100,220);
	Game.createWall(100,240);
	Game.createWall(100,260);
	Game.createWall(80,260);
	Game.createWall(80,240);
	Game.createWall(80,200);
	Game.createWall(60,260);
	Game.createWall(40,260);
	Game.createWall(20,260);
	Game.Entities.createBull(60,160,15);
	Game.createChest(40,220,[Game.getRandomItem(),Game.getRandomItem()]);
	
	
}
