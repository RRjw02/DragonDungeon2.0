Game.File = {};
/*
* Creates a file at directory (file should be inclided into the directory
* @param {string} directory - the directory to file
* @param {string} data - the stuff in the new file
*/
Game.File.Create = function(directory, data){
fs.writeFile(directory,data, (err) => {
	if (err) throw err;
	console.log("Made " + data + " in " + directory);
});
};
/**
* Creates a new directory
* @param {string} directory - the directory
*/
Game.File.CreateDir = function(directory){
	fs.mkdir(directory, 511, function(err) {
			if (err) throw err;
	});
};
/**
* returns everything in a file as a string
* @param {string} directory - the directory and the filename
*/
Game.File.ReadFile = function(directory){
	fs.readFile(directory, (err, data) => {
		if (err) throw err;
		return String(data);
});
};
/**
* Returns boolean if file exists
* @param {string} directory - directory and filename
*/
Game.File.Exists = function(directory){
    fs.exists(directory,(exists) =>{
        if (exists){
            //if file exists
            return true;
        }else{
            //if file dont exist
            return false;
        }
    })
};
/**
*
* Returns every filename in a directory
* @param {string} path - the path to the dirsctory
*/
Game.File.getAllFilesInPath = function(path){
    return fs.readdirSync(path);
};
if(typeof(Storage) !== "undefined"){
	Game.Console.sendMessage("Loading WebStorage Modules. . . ");
	Game.File.sessionStorage = {};
	
	
	Game.File.sessionStorage.set = function(key, value){
		sessionStorage.setItem(key,value);
	};
	Game.File.sessionStorage.get = function(key){
		return sessionStorage.getItem(key);
	};
	Game.File.localStorage = {};
	Game.File.localStorage.set = function(key, value){
		localStorage.setItem(key,value);
	};
	Game.File.localStorage.get = function(key){
		return localStorage.getItem(key);
	};
	
	Game.File.savePlayerInventory = function(){
		Game.File.localStorage.set("Inventory",  JSON.stringify(Game.player.inventory));
	};
	Game.File.getPlayerInventory = function(){
		var data = Game.File.sessionStorage.get("Inventory");
		return JSON.parse(data);
	};
	Game.File.savePlayerHealth = function(){
		Game.File.sessionStorage.set("hp",Game.player.health);
	};
	Game.File.getPlayerHealth = function(){
		var data = Number(Game.File.sessionStorage.get("hp"));
		return data;
	};
	Game.File.savePlayerScore = function(){
		Game.File.sessionStorage.set("score",Game.player.score);
	};
	Game.File.getPlayerInventory = function(){
		var data = Number(Game.File.sessionStorage.get("score"));
		return data;
	};
}else{
	Game.Console.sendWarning("No WebStorage Support");
}
if(typeof(Worker) !== "undefined"){
	Game.Console.sendMessage("Loading WebWorker Modules. . . ");
	Game.File.createWorker = function(file){
		var x = new Worker(file);
		return x;
	};
	Game.File.deleteWorker = function(worker){
		worker.terminate();
		worker = undefined;
	};
}else{
	Game.Console.sendWarning("No WebWorker Support");
}
