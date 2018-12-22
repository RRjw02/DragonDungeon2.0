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