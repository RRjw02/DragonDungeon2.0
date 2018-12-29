Game.createTree = function(x,y,texture){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"wall",true));	
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "tree_texture.png",x,y,"wall",true));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
}