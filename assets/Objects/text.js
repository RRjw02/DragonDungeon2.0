Game.createText = function(line, msg,color,xcoord){
	var x = line * 20;
	if(color != null){
		if(xcoord != null){
			Game.Texts.push(new Game.GameObject("20px","Consolas",color,xcoord,x,"text"));
		}else{
			Game.Texts.push(new Game.GameObject("20px","Consolas",color,100,x,"text"));
		}
	}else{
		if(xcoord != null){
			Game.Texts.push(new Game.GameObject("20px","Consolas","white",xcoord,x,"text"));
		}else{
			Game.Texts.push(new Game.GameObject("20px","Consolas","white",100,x,"text"));
		}
	}
	
	Game.Texts[Game.Texts.length - 1].text = msg;
}

//All the Texts in the game
Game.createText(2,"Health: ");
Game.createText(3,"Attack: ");
Game.createText(4,"Score: ");
