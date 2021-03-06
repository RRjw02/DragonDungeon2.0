Game.levelOne = function(){
	Game.getCurrentMenu.current = "levelOne";
	Game.Level.clear();
	Game.Teleport(Game.Level.pos.level1_enter.x,Game.Level.pos.level1_enter.y);
	
	Game.player.facing = "east";
	//BackGround
	Game.createBackgroundPrefix();
	Game.openInventory();
	Game.closeInventory();
	
	
	//Starting Room
		Game.createWall(20,140);
		Game.createWall(40,140);
		Game.createWall(60,140);
		Game.createWall(100,140);
		Game.createWall(120,140);
		Game.createWall(120,120);
		Game.createWall(120,100);
		Game.createWall(120,80);
		Game.createWall(120,60);
		Game.createWall(120,40);
		Game.createWall(120,20);
		Game.createWall(200,140);
		Game.createWall(220,140);
		Game.createWall(260,140);
		Game.createWall(280,140);
		Game.createWall(300,140);
		Game.createWall(300,160);
		Game.createWall(300,180);
		Game.createWall(300,200);
		Game.createWall(300,220);
		Game.createWall(300,240);
		Game.createWall(300,260);
		Game.createWall(300,280);
		Game.createWall(280,280);
		Game.createWall(260,280);
		Game.createWall(240,280);
		Game.createWall(220,280);
		Game.createWall(200,280);
		Game.createWall(180,280);
		Game.createWall(180,260);
		Game.createWall(140,20,"dirt_texture.jpg");
		Game.createWall(140,40,"dirt_texture.jpg");
		Game.createWall(140,60,"dirt_texture.jpg");
		Game.createWall(140,80,"dirt_texture.jpg");
		Game.createWall(140,100,"dirt_texture.jpg");
		Game.createWall(140,120,"dirt_texture.jpg");
		Game.createWall(160,20,"dirt_texture.jpg");
		Game.createWall(160,40,"dirt_texture.jpg");
		Game.createWall(160,60,"dirt_texture.jpg");
		Game.createWall(160,80,"dirt_texture.jpg");
		Game.createWall(160,100,"dirt_texture.jpg");
		Game.createWall(160,120,"dirt_texture.jpg");
		Game.createWall(180,20,"dirt_texture.jpg");
		Game.createWall(180,40,"dirt_texture.jpg");
		Game.createWall(180,60,"dirt_texture.jpg");
		Game.createWall(180,80,"dirt_texture.jpg");
		Game.createWall(180,100,"dirt_texture.jpg");
		Game.createWall(180,120,"dirt_texture.jpg");
		Game.createWall(380,20);
		Game.createWall(380,60);
		Game.createWall(380,80);
		Game.createWall(380,100);
		Game.createWall(380,120);
		Game.createWall(380,140);
		Game.createWall(340,140);
		Game.createWall(320,140);
		Game.createWall(200,20);
		Game.createWall(200,40);
		Game.createWall(200,60);
		Game.createWall(200,80);
		Game.createWall(200,100);
		Game.createWall(200,120);
		Game.createWall(340,160,"dirt_texture.jpg");
		Game.createWall(340,180,"dirt_texture.jpg");
		Game.createWall(340,200,"dirt_texture.jpg");
		Game.createWall(340,220,"dirt_texture.jpg");
		Game.createWall(320,160,"dirt_texture.jpg");
		Game.createWall(320,180,"dirt_texture.jpg");
		Game.createWall(320,200,"dirt_texture.jpg");
		Game.createWall(320,220,"dirt_texture.jpg");
		Game.createWall(380,160,"dirt_texture.jpg");
		Game.createWall(380,180,"dirt_texture.jpg");
		Game.createWall(380,200,"dirt_texture.jpg");
		Game.createWall(380,220,"dirt_texture.jpg");
		Game.createWall(320,240);
		Game.createWall(340,240);
		Game.createWall(380,240);
		Game.createWall(400,240);
		Game.createWall(300,300);
		Game.createWall(300,320);
		Game.createWall(320,320);
		Game.createWall(340,320);
		Game.createWall(360,320);
		Game.createWall(380,320);
		Game.createWall(400,320);
		Game.createWall(400,300);
		Game.createWall(400,280);
		Game.createWall(400,260);
		Game.createWall(140,140);
		Game.createWall(160,140);
		Game.createWall(180,140);
		Game.createWall(180,160);
		Game.createWall(180,200);
		Game.createWall(180,220);
		Game.createWall(180,240);
		Game.createWall(160,240);
		Game.createWall(140,240);
		Game.createWall(120,240);
		Game.createWall(100,240);
		Game.createWall(80,240);
		Game.createWall(60,240);
		Game.createWall(40,240);
		Game.createWall(20,240);
		//Interactables
		Game.createDoor(80,140);
		Game.createDoor(180,180);
		Game.createDoor(240,140);
		
		
		
		Game.createHiddenDoor(360,140);
		Game.createHiddenDoor(360,240);
		Game.createHiddenDoor(360,160,"dirt_texture.jpg");
		Game.createHiddenDoor(360,180,"dirt_texture.jpg");
		Game.createHiddenDoor(360,200,"dirt_texture.jpg");
		Game.createHiddenDoor(360,220,"dirt_texture.jpg");
		Game.dropItem(240,60);
		Game.createChest(100,200,[Game.Items.note_start,Game.getRandomItem()]);
		Game.createChest(340,280,[Game.Items.gold,Game.Items.gold,Game.Items.gold,Game.Items.arrow]);
		Game.createTree(320,180);
		Game.createTree(340,220);
		//Entities
		Game.Entities.createBat(100,220,5);
		
	Game.wallPrefix();
	
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 380,40,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",60,20,"image");
	Game.createWall(40,20);
	Game.createWall(20,20);
	Game.createWall(80,20);
	Game.createWall(100,20);
}
