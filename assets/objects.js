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
	if(type == "entity"){
		this.cooldown = false;
		this.count = 0;
		this.speed = 3;
		this.wallCheck = function(){
			if(this.noclip){
				//code when noclip is on
				return false;
			}else{
				return Game.hitWallCheck(this);
			}
		}
		this.AI = function(){
			var player = Game.player;
			if(this.speed != "none"){
				if(this.y >= player.y){
					this.y = this.y - 20;
					//Check to see if the ai hit a wall
					if(this.wallCheck()){
						this.y = this.y + 20
					}
				}else if(this.y <= player.y){
					this.y = this.y + 20;
					//Check to see if the ai hit a wall
					if(this.wallCheck()){
						this.y = this.y - 20;
					}
				}
				if(this.x >= player.x){
					this.x = this.x - 20;
					//Check to see if the ai hit a wall
					if(this.wallCheck()){
						this.x = this.x + 20;
					}
				}else if(this.x <= player.x){
					this.x = this.x + 20;
					//Check to see if the ai hit a wall
					if(this.wallCheck()){
						this.x = this.x - 20;
					}
				}
				//Check to see if the ai has caught a entity and deal
				//Damage to the entity
				//if(this.checkForEntities()){
				//	var ent = Game.Entities.getEntity(this.x,this.y);
				//	this.dealDamage(ent);
				//}
			}
			//End of this.AI
		}
		
	}
	if(type == "player" || type == "entity"){
		if(type == "player"){
			this.isPlayer = true;
		}else{
			this.isPlayer = false;
		}
		this.checkForEntities = function(){
			//Check for player;
			if(type != "player" && this.crashWith(Game.player)){
				return true;
			}
			//Check for the rest of the entities
			for(var i = 0; i < Game.Entities.inGame.length; i++){
				if(this.crashWith(Game.Entities.inGame[i])){
					return true;
				}
			}
			return false;
		}
		this.noclip = false;
		this.creatureType = creatureType;
		this.canMove = true;
		if(this.creatureType == "Mimic"){
			this.canMove = false;
		}
		if(this.creatureType == "Mimic" || this.creatureType == "Goblin" || this.creatureType == "boss"){
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
			Sound.onDeath.play();
			this.health -= num;
			if(this.health <= 0){
				this.isDead = true;
				this.onDeath();
			}
		}
		this.dealDamage = function(other){
			if(this.isPlayer){
				Game.Dialog.combat();
				this.takeDamage(other.damagePerHit);
			}
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
				Game.Dialog.setText("You Died!", 3, "red");
				this.canDoDamage = false;
				this.isHidden = true;
				this.canMove = false;
				if(other != null){
					other = null;
				}
				//location.reload();
			}else if(this.type == "entity"){
				this.dropItem();
				Game.player.score += 15;
				this.canDoDamage = false;
				this.canMove = false;
				this.isWall = false;
				this.isHidden = true;
				if(other != null){
					other = null;
				}
			}else if(this.creatureType == "boss"){
				Game.Level.inBossFight = false;
				var reward = Game.getRandomItem();
				Game.Dialog.setText("Boss beaten! Reward: " + reward.trueName, 3, "green");
				this.dropItem(reward);
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
				var Item = this.inventory[num - 1];
				Item.use();				
				if(Item.isConsumable){
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
	this.setImage = function(file){
		this.image = new Image();
		this.image.src = Game.File.getImageDirectory() + file;
	}
	
	this.facing = "east";
	this.score = 0;
	this.bounce = 0.6;
	this.speed = 1;
	this.color = color;
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
			if (this.image != null) {
				ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
			}else if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = this.color;
				ctx.fillText(this.text, this.x, this.y);
				}else {
				ctx.fillStyle = this.color;
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


Game.openChest = function(chest){
	Game.player.canMove = false;
	Game.pause = true;
	Game.getCurrentSubMenu.current = "chest";
	var temp = Game.inventoryText;
	temp.line1.color = "green";
	temp.line2.color = "green";
	temp.line3.color = "green";
	temp.line4.color = "green";
	temp.line5.color = "green";
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
