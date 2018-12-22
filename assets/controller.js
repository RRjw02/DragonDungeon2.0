/*
* Moves the player in different directions
* @param {string} dir - the direction to move "up" "down" "left" "right"
*/
function move(dir){
	if(Game.paused || Game.player.canMove){
		if(dir=="left"){
			Game.player.x = Game.player.x - 20;
			move("stop");
			if(Game.hitWallCheck(Game.player)){
				Game.player.x = Game.player.x + 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.takeDamage(other.damagePerHit);
				Game.player.dealDamage(other);
				Game.player.x = Game.player.x + 20;
				move("stop");
			}else{
				Game.player.facing = "east";
			}
		}else if(dir=="right"){
			Game.player.x = Game.player.x + 20;
			move("stop");
			if(Game.hitWallCheck(Game.player)){
				Game.player.x = Game.player.x - 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.takeDamage(other.damagePerHit);
				Game.player.dealDamage(other);
				Game.player.x = Game.player.x - 20;
				move("stop");
			}else{
				Game.player.facing = "west";
			}
		}else if(dir=="down"){
			Game.player.y = Game.player.y + 20;
			move("stop");
			if(Game.hitWallCheck(Game.player)){
				Game.player.y = Game.player.y - 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.takeDamage(other.damagePerHit);
				Game.player.dealDamage(other);
				Game.player.y = Game.player.y - 20;
				move("stop");
			}else{
				Game.player.facing = "south";
			}
		}else if(dir=="up"){
			Game.player.y = Game.player.y - 20;
			move("stop");
			if(Game.hitWallCheck(Game.player)){
				Game.player.y = Game.player.y + 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.takeDamage(other.damagePerHit);
				Game.player.dealDamage(other);
				Game.player.y = Game.player.y + 20;
				move("stop");
			}else{
				Game.player.facing = "north";
			}
		}
	}
}
/*
* Moves another gameobject across the screen
* @param {object} other - the other gameobject
* @param {string} dir - direction to move same as move()
*/
function moveOther(other,dir){
	if(dir=="left"){
		other.x -= 20;
		moveOther(other,"stop");
		Game.player.facing = "east";
	}else if(dir=="right"){
		other.x += 20;
		move(other,"stop");
		Game.player.facing = "west";
	}else if(dir=="down"){
		other.y += 20;
		move(other,"stop");
		Game.player.facing = "south";
	}else if(dir=="up"){
		other.y -= 20;
		move(other,"stop");
		Game.player.facing = "north";
	}
}
/**
* BROKEN
*
*/
//UNUSED too smooth oof
function Smoothmove(dir){
	if(dir=="left"){
		Game.player.speedX = -1.5;
		Game.player.speedY = 0;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 1.5;
			Game.player.speedY = 0;
		}
	}else if(dir=="right"){
		Game.player.speedX = 1.5;
		Game.player.speedY = 0;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = -1.5;
			Game.player.speedY = 0;
		}
	}else if(dir=="down"){
		Game.player.speedX = 0;
		Game.player.speedY = 1.5;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 0;
			Game.player.speedY = -1.5;
		}
	}else if(dir=="up"){
		Game.player.speedX = 0;
		Game.player.speedY = -1.5;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 0;
			Game.player.speedY = 1.5;
		}
	}else if(dir=="stop"){
		Game.player.speedX = 0;
		Game.player.speedY = 0;
	}
}
/**
 *
 * Detects the input from a keyboard using ROT.MIN.JS
 * no need to call this, it automatically is called when a key event
 */
Game.handleInput = function(inputType, inputData){
	if(!Game.isInMenu){
		//If ingame and not in the menu
		if(inputData.keyCode === ROT.VK_W){
			move("up");
		}else if(inputData.keyCode === ROT.VK_A){
			move("left");
		}else if(inputData.keyCode === ROT.VK_S){
			move("down");
		}else if(inputData.keyCode === ROT.VK_D){
			move("right");
		}else if(inputData.keyCode === ROT.VK_E){
			Game.player.pickUpItem();
		}else if(inputData.keyCode === ROT.VK_I){
			if(Game.getCurrentSubMenu.current == "none"){
				Game.pause = true;
				Game.openInventory();
			}else{
				Game.pause = false;
				Game.closeInventory();
			}
		}else if(inputData.keyCode === ROT.VK_F){
			if(Game.getCurrentSubMenu.current == "none"){
				if(Game.chestCheck()){
					Game.pause = true;
					Game.openChest(Game.getChest(Game.player.x,Game.player.y));
				}
			}else if(Game.getCurrentSubMenu.current == "chest"){
				Game.pause = false;
				Game.closeChest();
			}
			
		}
		//7 so far
		if(Game.getCurrentSubMenu.current == "inventory"){
			if(inputData.keyCode === ROT.VK_1){
				if(Game.checkInventory(1) != null){
					Game.player.useItem(1);
				}
			}
			if(inputData.keyCode === ROT.VK_2){
				if(Game.checkInventory(2) != null){
					Game.player.useItem(2);
				}
			}
			if(inputData.keyCode === ROT.VK_3){
				if(Game.checkInventory(3) != null){
					Game.player.useItem(3);
				}
			}
			if(inputData.keyCode === ROT.VK_4){
				if(Game.checkInventory(4) != null){
					Game.player.useItem(4);
				}
			}
			if(inputData.keyCode === ROT.VK_5){
				if(Game.checkInventory(5) != null){
					Game.player.useItem(5);
				}
			}
			if(inputData.keyCode === ROT.VK_6){
				if(Game.checkInventory(6) != null){
					Game.player.useItem(6);
				}
			}
			if(inputData.keyCode === ROT.VK_7){
				if(Game.checkInventory(7) != null){
					Game.player.useItem(7);
				}
			}
			if(inputData.keyCode === ROT.VK_8){
				if(Game.checkInventory(8) != null){
					Game.player.useItem(8);
				}
			}
			if(inputData.keyCode === ROT.VK_9){
				if(Game.checkInventory(9) != null){
					Game.player.useItem(9);
				}
			}
			if(inputData.keyCode === ROT.VK_10){
				if(Game.checkInventory(10) != null){
					Game.player.useItem(10);
				}
			}
		}
	}
	if(Game.isInMenu){
		//if in the Menu
		if(inputData.keyCode === ROT.VK_W){
			Game.Selected = "Start";
			Game.menuSelector.y = 50;
		}else if(inputData.keyCode === ROT.VK_S){
			Game.Selected = "Shop;"
			Game.menuSelector.y = 200;
		}else if(inputData.keyCode === ROT.VK_A){
			if(Game.Selected == "Start"){
				Game.isInMenu = false;
				Game.myGameArea.clear();
				Game.levelZero();
			}else if(Game.Selected == "Shop"){
				
			}
		}
	}
	if(Game.getCurrentSubMenu.current == "chest"){
		var chest = Game.getChest(Game.player.x,Game.player.y);
		if(inputData.keyCode === ROT.VK_1){
			var chestContent = chest.getContents(1);
			if(chestContent != null){
				if(chestContent == Game.Items.sword){
					chestContent = Game.Items.sword;
				}
				if(chestContent == Game.Items.bow){
					chestContent = Game.Items.bow;
				}
				if(chestContent == Game.Items.arrow){
					chestContent = Game.Items.arrow;
				}
				if(chestContent == Game.Items.gold){
					chestContent = Game.Items.gold;
				}
			
			Game.player.addToInventory(chestContent);
			chest.removeContents(1);
			}
		}
		if(inputData.keyCode === ROT.VK_2){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(2);
			if(chestContent != null){
				if(chestContent == Game.Items.sword){
					chestContent = Game.Items.sword;
				}
				if(chestContent == Game.Items.bow){
					chestContent = Game.Items.bow;
				}
				if(chestContent == Game.Items.arrow){
					chestContent = Game.Items.arrow;
				}
				if(chestContent == Game.Items.gold){
					chestContent = Game.Items.gold;
				}			
			Game.player.addToInventory(chestContent);
			chest.removeContents(2);
			}
		}
		if(inputData.keyCode === ROT.VK_3){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(3);
			if(chestContent != null){
				if(chestContent == Game.Items.sword){
					chestContent = Game.Items.sword;
				}
				if(chestContent == Game.Items.bow){
					chestContent = Game.Items.bow;
				}
				if(chestContent == Game.Items.arrow){
					chestContent = Game.Items.arrow;
				}
				if(chestContent == Game.Items.gold){
					chestContent = Game.Items.gold;
				}
			Game.player.addToInventory(chestContent);
			chest.removeContents(3);
			}
		}
		if(inputData.keyCode === ROT.VK_4){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(4);
			if(chestContent != null){
				if(chestContent == Game.Items.sword){
					chestContent = Game.Items.sword;
				}
				if(chestContent == Game.Items.bow){
					chestContent = Game.Items.bow;
				}
				if(chestContent == Game.Items.arrow){
					chestContent = Game.Items.arrow;
				}
				if(chestContent == Game.Items.gold){
					chestContent = Game.Items.gold;
				}
			Game.player.addToInventory(chestContent);
			chest.removeContents(4);
			}
		}
	}
	if(Game.Died){
		
			location.reload();
		
	}
	
}
