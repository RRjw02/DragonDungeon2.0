Game.File = {};
Game.File.Create = function(directory, data){
fs.writeFile(directory,data, (err) => {
	if (err) throw err;
	console.log("Made " + data + " in " + directory);
});
};
Game.File.CreateDir = function(directory){
	fs.mkdir(directory, 511, function(err) {
			if (err) throw err;
	});
};
Game.File.ReadFile = function(directory){
	fs.readFile(directory, (err, data) => {
		if (err) throw err;
		return String(data);
});
};

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
Game.File.ReadFileAsString = function(directory){
	fs.readFile(directory, "utf8", (err, data) => {
		if (err) throw err;
		console.log(data);
});
};
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