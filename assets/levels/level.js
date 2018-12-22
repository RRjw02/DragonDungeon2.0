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
/**
* Chooses a random level and loads it into memory
*/

Game.Level.chooseRandom = function(){
    Game.getRandom(Game.Level.levels);
}
Game.Level.levels = [];
Game.Level.level.push(Game.levelOne());
Game.Level.level.push(Game.levelTwo());
Game.Level.level.push(Game.levelThree());
	
