Game.Sound = {};
Game.Sound.getAll = [];
Game.Sound.SoundElement = function(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	Game.Sound.getAll.push(this.sound);
	this.isLooped = null;
	this.Loop = function(bool){
		this.isLooped = bool;
		this.sound.loop = bool;
	}
	this.isEnded = function(){
		return this.sound.ended;
	}
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	//document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
	this.pause = function(){
		this.stop();
	}
	this.mute = function(){
		this.sound.muted = true;
	}
	this.unmute = function(){
		this.sound.muted = false;
	}
	this.setVolume = function(number){
		this.sound.volume = number;
	}
	this.getVolume = function(){
		return this.sound.volume;
	}
	this.getPlayTime = function(){
		return this.sound.duration;
	}
	this.getCurrentTime = function(){
		return this.sound.currentTime;
	}
};

var Sound = {
	onDeath : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "entity_death.mp3"),
	Ambient : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "dungeon.mp3")
};
//Set Loop for all new sounds
Sound.onDeath.Loop(false);
Sound.Ambient.Loop(true);

