Game.Entities = {};
Game.Entities.inGame = [];

Game.Entities.checkHit = function(other){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(other.crashWith(Game.Entities.inGame[i]) && Game.Entities.inGame[i].isHidden != true){
			return true;
		}
	}
	return false;
}
Game.Entities.getEntity = function(x,y){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(Game.Entities.inGame[i].x == x && Game.Entities.inGame[i].y == y){
			return Game.Entities.inGame[i];
		}
	}
		return false;
}
//Broken
Game.Entities.createRandomEntity = function(x,y){
	var x = Game.getRandom(Game.Entities.list);
	if(x == 1){
		Game.Entities.createBull(x,y,5);
	}else if(x == 2){
		Game.Entities.createBat(x,y,5);
	}else if(x == 3){
		Game.Entities.createMimic(x,y,5);
	}else if(x == 4){
		Game.Entities.createGoblin(x,y,5);
	}
//	Game.Entities.inGame[Game.Entities.length - 1].x = x;
//	Game.Entities.inGame[Game.Entities.length - 1].y = y;
}
Game.Entities.list = {
	bull : 1,
	bat : 2,
	mimic : 3,
	goblin : 4
}
Game.Entities.createBull = function(x,y,health){
	var temp = new Game.GameObject(20,20,"red",0,0,"entity",true,"Bull");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}

Game.Entities.createBat = function(x,y,health){
	var temp = new Game.GameObject(20,20,"brown",0,0,"entity",true,"Bat");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 1;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}

Game.Entities.createMimic = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "chest_texture.png",0,0,"entity",true,"Mimic");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 2;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}
Game.Entities.createGoblin = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "goblin_texture.png",0,0,"entity", true, "Goblin");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 1;
	temp.health = health;
	Game.Entities.inGame.push(temp);
}