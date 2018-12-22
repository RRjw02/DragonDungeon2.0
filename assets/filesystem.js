/**
  * Output: returns String
  */
Game.File.getDirectory = function(){
	return "assets/";
};
Game.File.getLevelDirectory = function(){
	return Game.File.getDirectory() + Game.File.getDirectory() + "levels/";
};
Game.File.getSoundDirectory = function(){
	return Game.File.getDirectory() + Game.File.getDirectory() + "audio/";
};
Game.File.getImageDirectory = function(){
	return Game.File.getDirectory() + "images/";
};
Game.File.getNodeDirectory = function(){
	return "node_modules/";
};
Game.File.getStorageDirectory = function(){
	return "user/storage/";
};

//Creates the directories not defined manually.
Game.File.CreateDir("user/");
Game.File.CreateDir("user/storage/");
Game.File.CreateDir("user/storage/saves/");
Game.File.CreateDir("user/storage/data/");
Game.File.CreateDir("user/storage/leveldata/");

//Varables

//Storage Functions
