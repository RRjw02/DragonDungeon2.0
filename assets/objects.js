Game.GameObject = function(width, height, color, x, y, type, isWall,creatureType) {
	this.type = type;
	if(type == "text"){
		this.getText = function(){
			return this.text;
		}
		this.setText = function(text){
			this.text = text;
		}
	}
	if (type == "image" || type == "wall" || type == "door" || type == "droppedItem") {
		this.image = new Image();
		this.image.src = color;
	}
	if(type == "droppedItem"){
		this.heldItem;
		this.canMove = false;
		this.onDeath = function(){
				this.isHidden = true;
				this.heldItem = null;
		}
	}
	if(type == "player" || type == "entity"){
		this.creatureType = creatureType;
		this.canMove = true;
		if(this.creatureType == "Mimic" || this.creatureType == "Goblin"){
			this.canMove = false;
			this.image = new Image();
			this.image.src = color;
		}
		this.health = 20;
		this.damagePerHit = 2;
		this.isDead = false;
		this.canDoDamage = true;
		
		this.getHealth = function(){
			return this.health;
		}
		this.takeDamage = function(num){
			this.health -= num;
			if(this.health <= 0){
				this.isDead = true;
				this.onDeath();
			}
		}
		this.dealDamage = function(other){
			other.takeDamage(this.damagePerHit);
		}
		this.dropItem = function(item,slot){
			var x = this.x;
			var y = this.y;
			var copy = Game.CopyItem(item);
			var itemObj = new Game.GameObject(20,20,Game.File.getImageDirectory() + "droppedItem_texture.png",x,y,"droppedItem");
			if(item != null){
				itemObj.heldItem = copy;
			}else{
				itemObj.heldItem = Game.getRandomItem();
			}
			if(type == "player" && slot != null){
				this.inventory[slot - 1] = null;
			}
			Game.GameObjects.push(itemObj);
		}
		this.onDeath = function(other){
			if(this.type == "player"){
				this.canDoDamage = false;
				this.isHidden = true;
				this.canMove = false;
				if(other != null){
					other = null;
				}
				//location.reload();
			}else if(this.type == "entity"){
				this.dropItem();
				this.canDoDamage = false;
				this.canMove = false;
				this.isWall = false;
				this.isHidden = true;
				if(other != null){
					other = null;
				}
			}
		}
	}
	if(type == "player"){
		this.maxInventorySize = 10;
		this.inventory = [];
		this.pickUpItem = function(){
			for(var i = 0; i < Game.GameObjects.length; i++){
				if(Game.GameObjects[i].x == this.x && Game.GameObjects[i].y == this.y && Game.GameObjects[i].type == "droppedItem" && Game.GameObjects[i].heldItem != null){
					var get = Game.GameObjects[i];
					var item = get.heldItem;
					this.addToInventory(item);
					get.isDead = true;
					get.onDeath(get);
				}
			}
		}
		this.addToInventory = function(item){
				if(this.inventory.length <= this.maxInventorySize - 1){
					var x = Game.CopyItem(item);
					this.inventory.push(x);
				}else{
					Game.Console.sendMessage("Player cannot hold any more items! Current Backpack size: " + this.maxInventorySize);
				}
		}
		this.getItem = function(num){
			if(num <= this.maxInventorySize){
				return this.inventory[num - 1];
			}else{
				Game.Console.sendMessage("Error!: this.getItem(num) needs a valid number thats less than or equal too " + this.maxInventorySize);
			}
		}
		this.useItem = function(num){
			if(num <= this.maxInventorySize){
				this.inventory[num - 1].use();
				if(this.inventory[num - 1].isConsumable){
					this.inventory[num - 1] = null;
				}
			}else{
				Game.Console.sendMessage("Error!: this.useItem(num) needs a valid number thats less than or equal too " + this.maxInventorySize);
			}
		}
		this.checkItem = function(num){
			if(num <= this.maxInventorySize && this.getItem(num) != null){
				return true;
			}else{
				return false;
			}
		}
		
		this.equippedItem;
		this.equiptItem = function(num){
			if(this.checkItem(num)){
				this.inventory[num - 1].name = this.inventory[num - 1].trueName + " (equipped)";
				this.equippedItem = this.inventory[num];
			}else{
				Game.Console.sendMessage("No item at this.checkItem(" + num + ");");
			}
		}
		this.unEquiptItem = function(num){
			if(this.checkItem(num)){
				this.inventory[num - 1].name = this.inventory[num - 1].trueName;
				this.equippedItem;
			}else{
				Game.Console.sendMessage("No item at this.checkItem(" + num + ");");
			}
		}
	}
	if(type == "chest"){
		this.contents = [];
		this.getContents = function(num){
			if(this.contents[num - 1] != null){
				return this.contents[num - 1];
			}else{
				return null;
			}
		}
		this.setContents = function(item){
			var copy = Game.CopyItem(item)
			this.contents.push(copy);
		}
		this.removeContentsExcept = function(num){
			this.contents.splice(num - 1,1);
		}
		this.removeContents = function(num){
			this.contents[num - 1] = null;
		}
		this.image = new Image();
		this.image.src = color;
	}
	
	
	this.facing = "east";
	this.score = 0;
	this.bounce = 0.6;
	this.speed = 1;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;	
	this.x = x;
	this.y = y;
	this.isHidden = false;
	this.isWall = isWall;
	this.getFacing = function(){
		return this.facing;
	}
	this.update = function() {
		if(!this.isHidden){
			ctx = Game.myGameArea.context;
			if (type == "image" || type == "chest" || type == "wall" || type == "door" || this.creatureType == "Mimic" || this.creatureType == "Goblin" || type == "droppedItem") {
				ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
			}else if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = color;
				ctx.fillText(this.text, this.x, this.y);
				}else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}else{
			//Called if the hidden object is called through Object.update();
			//Triggers are hidden
			
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	
	this.triggerFunction;
	this.hitBottom = function() {
		var rockbottom = Game.myGameArea.canvas.height - this.height;
		if (this.y > rockbottom) {
			this.y = rockbottom;
		}
	}
	this.crashWith = function(otherobj){
		//define the current objects "hitbox"
		var playerleft = this.x;
		var playerright = this.x + (this.width);
		var playertop = this.y;
		var playerbottom = this.y + (this.height);
		
		//define the otherobj "hitbox"
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		
		//define crash so we can actually use it
		var crash = true;
		
		if ((playerbottom <= othertop) || (playertop >= otherbottom) || (playerright <= otherleft) || (playerleft >= otherright)) {
			crash = false;
		}
		return crash;
	}
}

Game.hitWallCheck = function(other){
	for(var i = 0; i < Game.Walls.length; i++){
		if(other.crashWith(Game.Walls[i])){
			return true;
		}
	}
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(other.crashWith(Game.GameObjects[i]) && Game.GameObjects[i].isWall){
			return true;
		}
	}
	return false;
}

//Trigger Functions
Game.createTrigger = function(x,y,isHidden,triggeredFunction){
	var temp = new Game.GameObject(20, 20, "blue", x, y, "trigger", false);
	temp.triggerFunction = triggeredFunction;
	temp.isHidden = isHidden;
	Game.triggers.push(temp);	
	Game.Console.sendMessage("Trigger created at: X: " + temp.x + " Y: " + temp.y);
}
Game.getTrigger = function(x,y){
	for(var i = 0; i < Game.triggers.length; i++){
		if(Game.triggers[i].type == "trigger" && Game.triggers[i].x == x && Game.triggers[i].y == y){
			return Game.triggers[i];
		}
	}
	return false;
}
Game.showAllTriggers = function(){
	for(var i = 0; i < Game.triggers.length; i++){
		Game.triggers[i].isHidden = false;
	}
}
Game.hideAllTriggers = function(){
	for(var i = 0; i < Game.triggers.length; i++){
		Game.triggers[i].isHidden = true;
	}
}

//----------------------------------------------------------------------------------------
//Wall functions
Game.createWall = function(x,y,texture){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"wall",true));	
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "dungeon_wall_20x20.jpg",x,y,"wall",true));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	Game.Console.sendMessage("Wall created at: X: " + obj.x + " Y: " + obj.y);
}
Game.createTree = function(x,y,texture){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"wall",true));	
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "tree_texture.png",x,y,"wall",true));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	Game.Console.sendMessage("Tree created at: X: " + obj.x + " Y: " + obj.y);
}
Game.getWall = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].type == "wall" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return false;
}
Game.createBackground = function(x,y,texture){
	if(texture != null){
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
	}else{
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "dungeon_floor.jpg",x,y,"image"));
	}
}
//Door that looks like a wall
Game.createHiddenDoor = function(x,y,texture){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"door",false));
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "dungeon_wall_20x20.jpg",x,y,"door",false));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	Game.Console.sendMessage("Hidden Door created at: X: " + obj.x + " Y: " + obj.y);
	//create the triggers for the open/close of the doors
	Game.createTrigger(x,y-20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y-40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
		
	Game.createTrigger(x,y+20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y+40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x+20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x+40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x-20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x-40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
}

//----------------------------------------------------------------------------------------
//Door functions
Game.createDoor = function(x,y){
	Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",x,y,"door",false));
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	Game.Console.sendMessage("Door created at: X: " + obj.x + " Y: " + obj.y);
	//create the triggers for the open/close of the doors
	Game.createTrigger(x,y-20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y-40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
		
	Game.createTrigger(x,y+20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y+40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x+20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x+40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x-20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x-40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
}
Game.getDoor = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].type == "door" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return false;
}

Game.removeWall = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].isWall == true && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){   
			//Hide the wall and make it not a wall to disable the wall check;
			Game.GameObjects[i].isHidden = true;
			Game.GameObjects[i].type = "image";
		}
	}
}

//Text Functions

Game.createText = function(line, msg){
	var x = line * 20;
	Game.Texts.push(new Game.GameObject("20px","Consolas","black",100,x,"text"));
	Game.Texts[Game.Texts.length - 1].text = msg;
}


//Game Functions
Game.dropItem = function(x,y){
	var itemObj = new Game.GameObject(20,20,Game.File.getImageDirectory() + "droppedItem_texture.png",x,y,"droppedItem");
	itemObj.heldItem = Game.getRandomItem();
	Game.GameObjects.push(itemObj);
	Game.Console.sendMessage("droppedItem created at: X: " + itemObj.x + " Y: " + itemObj.y + " Containing: " + itemObj.heldItem.trueName);
}
//----------------------------------------------------------------------------------------
//Dialog Item functions
//TODO
Game.createDialogItem = function(x,y,onTrigger){
	
}
Game.getDialogItem = function(x,y){
	
}
//Chest functions
Game.createChest = function(x,y,contents){
	Game.chests.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "chest_texture.png",x,y,"chest"));
	var obj = Game.chests[Game.chests.length - 1];
	Game.Console.sendMessage("Chest created at: X: " + obj.x + " Y: " + obj.y);
	for(var i = 0; i < contents.length; i++){
		Game.chests[Game.chests.length - 1].setContents(contents[i]);
	}
}
Game.getChest = function(x,y){
	for(var i = 0; i < Game.chests.length; i++){
		if(Game.chests[i].type == "chest" && Game.chests[i].x == x && Game.chests[i].y == y){
			return Game.chests[i];
		}
	}
	return false;
}
Game.checkChest = function(num){
	if(Game.getChest(Game.player.x,Game.player.y) != null && Game.getChest(Game.player.x,Game.player.y).getContents(num ) != null){
		return Game.getChest(Game.player.x,Game.player.y).getContents(num).trueName;
	}else{
		return "Empty";
	}
	
}
Game.openChest = function(chest){
	Game.player.canMove = false;
	Game.pause = true;
	Game.getCurrentSubMenu.current = "chest";
	var temp = Game.inventoryText;
	temp.line1.text = "Chest: ";
	temp.line2.text = "[1]: " + Game.checkChest(1);
	temp.line3.text = "[2]: " + Game.checkChest(2);
	temp.line4.text = "[3]: " + Game.checkChest(3);
	temp.line5.text = "[4]: " + Game.checkChest(4);
}
Game.closeChest = function(){
	Game.player.canMove = true;
	Game.pause = false;
	Game.getCurrentSubMenu.current = "none";
}
Game.chestCheck = function(){
	for(var i = 0; i < Game.chests.length; i++){
		if(Game.player.crashWith(Game.chests[i])){
			return true;
		}
	}
	return false;
}
//----------------------------------------------------------------------------------------
//Items
Game.inventoryMenu = {};
Game.inventoryMenu.inside = new Game.GameObject(1000,1000,"white", 0, 0);
Game.inventoryMenu.outside = new Game.GameObject(Game.myGameArea.width,Game.myGameArea.height, "black", 0, 0);
Game.inventoryText = {
		line1: new Game.GameObject("20px","Consolas","black",65,85,"text"),
		line2: new Game.GameObject("20px","Consolas","black",65,105,"text"),
		line3: new Game.GameObject("20px","Consolas","black",65,125,"text"),
		line4: new Game.GameObject("20px","Consolas","black",65,145,"text"),
		line5: new Game.GameObject("20px","Consolas","black",65,165,"text"),
		line6: new Game.GameObject("20px","Consolas","black",65,185,"text"),
		line7: new Game.GameObject("20px","Consolas","black",65,205,"text"),
		line8: new Game.GameObject("20px","Consolas","black",65,225,"text"),
		line9: new Game.GameObject("20px","Consolas","black",65,245,"text"),
		line10: new Game.GameObject("20px","Consolas","black",65,265,"text"),
		line11: new Game.GameObject("20px","Consolas","black",65,65,"text")
	}
Game.checkInventory = function(num){
	if(Game.player.checkItem(num)){
		return Game.player.getItem(num).name;
	}else{
		return "Empty";
	}
}
Game.openInventory = function(){
	Game.player.canMove = false;
	Game.pause = true;
	Game.getCurrentSubMenu.current = "inventory";
	var temp = Game.inventoryText;
	temp.line11.text = "Press the specified number to use item";
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
}
Game.closeInventory = function(){
	Game.getCurrentSubMenu.current = "none";
	Game.player.canMove = true;
	Game.pause = false;
}


//Prefix's
//Premade Structures

//The Wall around the Game so you cant escape the area
Game.wallPrefix = function(texture){
	//Define the dungeon walls
	//left Side
	for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
		if(texture != null){
			Game.createWall(0,i,texture);
		}else{
			Game.createWall(0,i);
		}
	}
	//TOP
	for(var i = 0; i < Game.myGameArea.getWidth(); i += 20){
		if(texture != null){
			Game.createWall(i,0,texture);
		}else{
			Game.createWall(i,0);
		}
	}
	//BOTTOM
	for(var i = 0; i < Game.myGameArea.getWidth(); i += 20){
		if(texture != null){
			Game.createWall(i,480,texture);	
		}else{
			Game.createWall(i,480);	
		}
	}
	//Right Side
	for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
		if(texture != null){
			Game.createWall(980,i,texture);
		}else{
			Game.createWall(980,i);
		}
	}
}
Game.createBackgroundPrefix = function(texture){
	for(var z = 0; z < Game.myGameArea.getWidth(); z += 20){
		for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
			if(texture != null){
				Game.createBackground(z,i,texture);
			}else{
				Game.createBackground(z,i);
			}
		}
	}
}
//Create Room Prefix
//todo
Game.createRoom = function(x,y,width,height,doors){
	
}




Game.DeveloperMode = function(){
	Game.dev = true;
	Game.showAllTriggers();
}

Game.createText(2,"Health: ");
Game.createText(3,"Attack: ");
Game.createText(4,"Score: ");