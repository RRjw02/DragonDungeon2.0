Game.bossLevel = function(){
	Game.Level.inBossFight = true;
	Game.Level.clear();
	//BackGround
	Game.createBackgroundPrefix("dirt_texture.jpg");
	
	//prevents an inventory bug
	Game.openInventory();
	Game.closeInventory();
	
	Game.wallPrefix("brick_texture.png");
	Game.Entities.Boss.create(200,200,"dragon_texture.png",25*Game.Level.nextBoss,Game.Level.nextBoss / 4,4);
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
	Game.bossBlock = new Game.GameObject(20,20,Game.Textures.brick.src,940,100,"image",true);
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 960, 100,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",99999,99999,"image");
}