Game.createBackground = function(x,y,texture){
	if(texture != null){
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
	}else{
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
	}
}