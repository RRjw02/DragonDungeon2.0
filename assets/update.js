Game.updateGameArea = function() {
    
	if(!Game.isInMenu/* && Game.getCurrentMenu() == "levelOne"*/){
		if(Game.player.crashWith(Game.winBlock)){
			
			/* if this dont work uncommemt
			Game.forceStart();*/
			if(Game.Level.current > 0){
				Game.Level.current++;
				Game.Level.randomLevel();
			
			}
			
		}
		if(Game.player.crashWith(Game.backBlock)){
			//return to a level
			if(Game.getCurrentMenu.current == "levelOne"){
				Game.Level.clear();
				Game.levelZero();
				Game.player.x = 940;
				Game.player.y = 100;
			}else if(Game.getCurrentMenu.current == "levelTwo"){
				Game.Level.clear();
				Game.levelOne();
				Game.player.x = 20;
				Game.player.y = 120;
			}else if(Game.getCurrentMenu.current == "levelThree"){
				Game.Level.clear();
				Game.levelTwo();
				Game.player.x = 20;
				Game.player.y = 120;
			}
			Game.forceStart();
		}
		for (i = 0; i < Game.Dangers.length; i += 1) {
			if (Game.player.crashWith(Game.Dangers[i])) {
				moveOther(Game.Dangers[i],"up");
				Game.pause = true;
				Game.Text.text = "You Failed! press any key to restart";
				Game.Text.update();
				Game.Died = true;
				return;
			} 
		}
		for (i = 0; i < Game.triggers.length; i += 1) {
			if (Game.player.crashWith(Game.triggers[i])) {
				Game.triggers[i].triggerFunction();
			} 
		}
		
		if(!Game.pause){
			Game.myGameArea.clear();
			Game.Background.update();
			for(var i = 0; i < Game.Backgrounds.length; i += 1){
				Game.Backgrounds[i].update();
			}
			for (i = 0; i < Game.GameObjects.length; i += 1) {
				Game.GameObjects[i].update();
			}
			
			for (i = 0; i < Game.Dangers.length; i += 1){
				Game.DangerTick(Game.Dangers[i]);
				Game.Dangers[i].update();
			}
			for(var i = 0; i < Game.triggers.length; i += 1){
				Game.triggers[i].update();
			}
			for(var i = 0; i < Game.chests.length; i += 1){
				Game.chests[i].update();
			}
			for(var i = 0; i < Game.Entities.inGame.length; i += 1){
				Game.Entities.inGame[i].update();
			}
			Game.player.update();
			//Standard texts
			Game.Texts[0].text = "Health: " + Game.player.health;
			Game.Texts[1].text = "Attack: " + Game.player.damagePerHit;
			Game.Texts[2].text = "Score: " + Game.player.score;
			for(var i = 0; i < Game.Texts.length; i += 1){
				Game.Texts[i].update();
			}
			Game.winBlock.update();
			Game.backBlock.update();
			Game.Player.inventoryRefresh();
		}
	}else if(Game.isInMenu){
		//Display the main menu
		Game.Background.update();
		Game.Text.update();
		Game.menuSelector.update();
		Game.menuButton_startGame.update();
		Game.menuText_startGame.update();
		
		Game.menuButton_shop.update();
		Game.menuText_shop.update();
		
	}
	if(Game.getCurrentSubMenu.current == "inventory"){
				Game.inventoryMenu.inside.update();
				Game.inventoryMenu.outside.update();
				var temp = Game.inventoryText;
				temp.line1.text = "[1]: " + Game.checkInventory(1);
				temp.line2.text = "[2]: " + Game.checkInventory(2);
				temp.line3.text = "[3]: " + Game.checkInventory(3);
				temp.line4.text = "[4]: " + Game.checkInventory(4);
				temp.line5.text = "[5]: " + Game.checkInventory(5);
				temp.line6.text = "[6]: " + Game.checkInventory(6);
				temp.line7.text = "[7]: " + Game.checkInventory(7);
				temp.line8.text = "[8]: " + Game.checkInventory(8);
				temp.line9.text = "[9]: " + Game.checkInventory(9);
				temp.line10.text = "[10]: " + Game.checkInventory(10);
				Game.inventoryText.line11.text = "Press the specified number to use item";
				Game.inventoryText.line1.update();
				Game.inventoryText.line2.update();
				Game.inventoryText.line3.update();
				Game.inventoryText.line4.update();
				Game.inventoryText.line5.update();
				Game.inventoryText.line6.update();
				Game.inventoryText.line7.update();
				Game.inventoryText.line8.update();
				Game.inventoryText.line9.update();
				Game.inventoryText.line10.update();
				Game.inventoryText.line11.update();
	}
	if(Game.getCurrentSubMenu.current == "chest"){
				Game.inventoryMenu.inside.update();
				Game.inventoryMenu.outside.update();
				var temp = Game.inventoryText;
				temp.line1.text = "Chest: ";
				temp.line2.text = "[1]: " + Game.checkChest(1);
				temp.line3.text = "[2]: " + Game.checkChest(2);
				temp.line4.text = "[3]: " + Game.checkChest(3);
				temp.line5.text = "[4]: " + Game.checkChest(4);
				Game.inventoryText.line1.update();
				Game.inventoryText.line2.update();
				Game.inventoryText.line3.update();
				Game.inventoryText.line4.update();
				Game.inventoryText.line5.update();
	}
}

Game.everyinterval = function(n) {
    if ((Game.myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

Game.accelerate = function(n) {
    Game.player.gravity = n;
}
Game.DangerTick = function(dangerObject){
	var x = dangerObject.x;
	var y = dangerObject.y;
	if(y >= 500){
		dangerObject.y = 0;
	}else{
		moveOther(dangerObject,"down");
	}
	
}
