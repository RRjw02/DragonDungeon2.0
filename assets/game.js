window.resizeTo(1200,700);
//Define all varables here for use by the game
Game = {};
Game.player;
Game.dev = false;
Game.GameObjects = [];
Game.Walls = [];
Game.Died = false;
Game.backBlock;
Game.Text;
Game.Backgrounds = [];
Game.Dangers = [];
Game.triggers = [];
Game.chests = [];
Game.pause = false;
Game.highestLevel = 1; //so you only can access level 1 when you first load the game.
Game.beatLevel = false;
Game.winBlock;
//Menu Varables
Game.isInMenu = true;
Game.menuSelector;
Game.Selected;
Game.AlreadyInMenu = false;
Game.menuObjects = [];

Game.menuButton_startGame;
Game.menuText_startGame;

Game.menuButton_shop;
Game.menuText_shop;

Game.menuButton_options;
Game.menuText_options;

Game.menuButton_about;
Game.menuText_options;


Game.Texts = [];
Game.hasBinded = false;

Game.isObject = function(variable){
	var variable;
	if(variable instanceof Object){
		return true;
	}else{
		return false;
	}
};
Game.isString = function(variable){
	var variable;
	if(variable instanceof String){
		return true;
	}else{
		return false;
	}
};
Game.getRandom = function(obj){
	var keys = Object.keys(obj);
    return	obj[keys[ keys.length * Math.random() << 0]];
}
Game.CopyArray = function(array){
  let objCopy = {};
  let key;
  for (key in array) {
    objCopy[key] = array[key];
  }
  return objCopy;
}