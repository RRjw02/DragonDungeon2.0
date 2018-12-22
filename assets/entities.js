Game.Entities = {};
//All the entities in game excluding the player
Game.Entities.inGame = [];
/**
* Checks to see if an gameobject hit an entity
* @param {object} other - the GameObject you wanna check to see if it hit a entity
**/
Game.Entities.checkHit = function(other){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(other.crashWith(Game.Entities.inGame[i]) && Game.Entities.inGame[i].isHidden != true){
			return true;
		}
	}
	return false;
}
/**
* Returns an entity at (x,y)
* @param {int} x - the x position to look for
* @param {int} y - the y position to look for
*/
Game.Entities.getEntity = function(x,y){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(Game.Entities.inGame[i].x == x && Game.Entities.inGame[i].y == y){
			return Game.Entities.inGame[i];
		}
	}
		return false;
}
/**
* Creates a bull entity at (x,y) with health
* @param {int} x - x position of the bull
* @param {int} y - y position of the bull
* @param {int} health - the startinh health of the bull
*/
Game.Entities.createBull = function(x,y,health){
	var temp = new Game.GameObject(20,20,"red",0,0,"entity",true,"Bull");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}
/**
* Creates a bat entity at (x,y) with health
* @param {int} x - x position of the bat
* @param {int} y - y position of the bat
* @param {int} health - the startinh health of the bat
*/
Game.Entities.createBat = function(x,y,health){
	var temp = new Game.GameObject(20,20,"brown",0,0,"entity",true,"Bat");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 1;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}
/**
* Creates a mimic entity at (x,y) with health
* @param {int} x - x position of the mimic
* @param {int} y - y position of the mimic
* @param {int} health - the startinh health of the mimic
*/
Game.Entities.createMimic = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "chest_texture.png",0,0,"entity",true,"Mimic");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 2;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}
/**
* Creates a goblin entity at (x,y) with health
* @param {int} x - x position of the goblin
* @param {int} y - y position of the goblin
* @param {int} health - the startinh health of the goblin
*/
Game.Entities.createGoblin = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "goblin_texture.png",0,0,"entity", true, "Goblin");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 1;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}
