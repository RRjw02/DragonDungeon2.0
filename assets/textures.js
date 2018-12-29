Game.Texture = function(imageurl,data){
	this.src = Game.File.getImageDirectory() + imageurl;
	this.data = data;
	this.isPNG;
	if(this.data.type === "png"){
		this.isPNG = true;
	}else{
		this.isPNG = false;
	}
	if(this.data.isTransparentBackground != null){
		this.isTransparent = this.data.isTransparentBackground;
	}else{
		this.isTransparent = false;
	}
	this.setTexture = function(newSRC){
		var newSRC;
		try{
			this.src = newSRC;
		}catch(err){
			throw(err);
		}
	}
}
//Define all game Textures here
Game.Textures = {};
Game.Textures.wall = new Game.Texture("dungeon_wall_20x20.jpg",{type: "jpg"});
Game.Textures.dirt = new Game.Texture("dirt_texture.jpg",{type: "jpg"});
Game.Textures.brick = new Game.Texture("brick_texture.png",{type: "png"});
Game.Textures.chest = new Game.Texture("chest_texture.png",{type: "png",isTransparentBackground: true});
Game.Textures.door = new Game.Texture("door_texture.jpg",{type: "jpg"});
Game.Textures.droppedItem = new Game.Texture("droppedItem_texture.png",{type: "png",isTransparentBackground: true});
Game.Textures.floor = new Game.Texture("dungeon_floor.jpg",{type: "jpg"});
Game.Textures.goblin = new Game.Texture("goblin_texture.png",{});