Game.AI = {};
Game.AI.think = function(){
	for(var i = 0; i < Game.Entities.inGame.length; i += 1){
		Game.Entities.inGame[i].AI();
		Game.Entities.inGame[i].update();
	}
}
Game.AI.tick = function(){
	for(var i = 0; i < Game.Entities.inGame.length; i += 1){
		if(Game.Entities.inGame[i].cooldown){
			//code when cool down is ready to move the entity
			if(!Game.Entities.inGame[i].isDead){
				Game.AI.think();
			}
			
			Game.Entities.inGame[i].cooldown = false;
		}else{
			//Code when cool down isnt ready
			//sets the entity to be able to move next move
			Game.Entities.inGame[i].count;
			if(Game.Entities.inGame[i].count > Game.Entities.inGame[i].speed){
				Game.Entities.inGame[i].cooldown = true;
				Game.Entities.inGame[i].count = 0;
			}else{
				Game.Entities.inGame[i].count++;
			}
		}
				
	}
}