Game.Level = {};
Game.Level.clear = function(){
	Game.File.savePlayerInventory();
	Game.File.savePlayerHealth();
	Game.File.savePlayerScore();
	Game.Walls = [];
	Game.Backgrounds = [];
	Game.GameObjects = [];
	Game.Dangers = [];
	Game.triggers = [];
	Game.Entities.inGame = [];
	Game.chests = [];
	Game.winBlock = undefined;
	Game.Text;
	Game.backBlock = undefined;
}
Game.Level.inBossFight = false;
Game.Level.pos = {
	level0_enter : {x: undefined, y: undefined},
	level0_exit : {x: 940, y: 100},
	
	level1_enter : {x: 60, y: 40},
	level1_exit : {x: 360, y: 40},
	
	level2_enter : {x: 60, y: 40},
	level2_exit : {x: 60, y: 220},
	
	level3_enter : {x: 60, y: 40},
	level3_exit : {x: 60, y: 40}
}
Game.Level.previous = [0];
Game.Level.levels = {};
Game.Level.depth = 0;
Game.Level.nextBoss = 7;
Game.Level.levels.levelOne = 1;
Game.Level.levels.levelTwo = 2;
//Game.Level.levels.levelThree = 3;
Game.randomLevel = function(){
	var rand = Game.getRandom(Game.Level.levels);
	if(Game.Level.depth === Game.Level.nextBoss){
		Game.Level.nextBoss += 7;
		Game.bossLevel();
		Game.Teleport(480,200);
	}else{
		Game.Level.inBossFight = false;
		if(rand == 1){
			Game.levelOne();
			Game.Teleport(Game.Level.pos.level1_enter.x,Game.Level.pos.level1_enter.y);
			Game.Level.previous.push(1);
		}else if(rand == 2){
			Game.levelTwo();
			Game.Teleport(Game.Level.pos.level2_enter.x,Game.Level.pos.level2_enter.y);
			Game.Level.previous.push(2);
		}else if(rand == 3){
			Game.levelThree();
			Game.Teleport(Game.Level.pos.level3_enter.x,Game.Level.pos.level3_enter.y);
			Game.Level.previous.push(3);
		}else if(rand == 4){
			//Game.levelFour();
		}
	}
}
//FUCKING BROKEN (took me like 3 seconds to code) ill fix in the morning or something0
Game.loadPreviousLevel = function(){
	if(Game.Level.previous[Game.Level.previous.length - 2] == 0){
		Game.levelZero();
		Game.Teleport(Game.Level.pos.level0_exit.x,Game.Level.pos.level0_exit.y);
		Game.Level.previous.push(0);
	}else if(Game.Level.previous[Game.Level.previous.length - 2] == 1){
		Game.levelOne();
		Game.Teleport(Game.Level.pos.level1_enter.x,Game.Level.pos.level1_exit.y);
		Game.Level.previous.push(1);
	}else if(Game.Level.previous[Game.Level.previous.length - 2] == 2){
		Game.levelTwo();
		Game.Teleport(Game.Level.pos.level2_exit.x,Game.Level.pos.level2_exit.y);
		Game.Level.previous.push(2);
	}else if(Game.Level.previous[Game.Level.previous.length - 2] == 3){
		Game.levelThree();
		Game.Teleport(Game.Level.pos.level3_exit.x,Game.Level.pos.level3_exit.y);
		Game.Level.previous.push(3);
	}else if(Game.Level.previous[Game.Level.previous.length - 2] == 4){
		//Game.levelFour();
	}else{
		Game.Console.sendWarning("Error! no previous level!")
	}
}
