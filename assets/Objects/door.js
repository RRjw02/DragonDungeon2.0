Game.createDoor = function(x,y){
	Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",x,y,"door",false));
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	//Game.Console.sendMessage("Door created at: X: " + obj.x + " Y: " + obj.y);
	//create the triggers for the open/close of the doors
	Game.createTrigger(x,y-20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y-40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
		
	Game.createTrigger(x,y+20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y+40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x+20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x+40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x-20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x-40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
}


Game.createHiddenDoor = function(x,y,texture){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"door",false));
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brick_20x20.png",x,y,"door",false));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	//Game.Console.sendMessage("Hidden Door created at: X: " + obj.x + " Y: " + obj.y);
	//create the triggers for the open/close of the doors
	Game.createTrigger(x,y-20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y-40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
		
	Game.createTrigger(x,y+20,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x,y+40,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x+20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x+40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x+20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
	
	Game.createTrigger(x-20,y,true,function(){Game.getDoor(x,y).isHidden = true;});
	Game.createTrigger(x-40,y,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y+20,true,function(){Game.getDoor(x,y).isHidden = false;});
	Game.createTrigger(x-20,y-20,true,function(){Game.getDoor(x,y).isHidden = false;});
}


Game.getDoor = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].type == "door" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return false;
}
