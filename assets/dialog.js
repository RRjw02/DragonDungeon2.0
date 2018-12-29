Game.Dialog = {};
Game.Dialog.isActive = false;
Game.Dialog.element = new Game.GameObject(1000,600,Game.File.getImageDirectory() + "brick_texture.png",0,340,"image");
Game.Dialog.element.isHidden = true;
Game.Dialog.texts = [];
Game.Dialog.textsMSG = [];
Game.Dialog.setText = function(text, position, color){
	var x = 18 * 20;
	var pos = 20 * position;
	Game.Dialog.element.isHidden = false;
	Game.Dialog.isActive = true;
	if(color != null){
		Game.Dialog.texts.push(new Game.GameObject("20px","Consolas",color,340,x + pos,"text"));
	}else{
		Game.Dialog.texts.push(new Game.GameObject("20px","Consolas","white",340,x + pos,"text"));
	}
	Game.Dialog.textsMSG.push(text);
	Game.Dialog.texts[Game.Dialog.texts.length - 1].text = text;
}
Game.Dialog.update = function(){
	Game.Dialog.element.update();
	for(var i = 0; i < Game.Dialog.texts.length; i++){
		Game.Dialog.texts[i].text = Game.Dialog.textsMSG[i]
		Game.Dialog.texts[i].update();
	}
}
Game.Dialog.hide = function(){
		Game.Dialog.element.isHidden = true;
		Game.Dialog.texts = [];
		Game.Dialog.textsMSG = [];
}
Game.Dialog.displayChestText = function(){
	Game.Dialog.setText("You see a chest!",3);
	Game.Dialog.setText("Press [F] to interact!",6,"green");
}
Game.Dialog.displayItemStats = function(item){
	Game.Dialog.setText("Item: " + item.trueName, 1);
	//Game.Console.sendMessage(item.trueName);
	if(item.trueName === Game.Items.sword.trueName){
		Game.Dialog.setText("Attack bonus: " + Game.Items.sword.attack,2);
		Game.Dialog.setText("Rarity: " + Game.Items.sword.rarity,3);
		Game.Dialog.setText("A well made sword lays on the floor were your standing.",4);
	}else if(item.trueName === Game.Items.note_start.trueName){
		Game.Dialog.setText("Note: ",2);
		Game.Dialog.setText("Welcome to Dragon Dungeon 2!",3);
	}else if(item.trueName === Game.Items.bow.trueName){
		Game.Dialog.setText("Attack bonus: " + Game.Items.bow.attack,2);
		Game.Dialog.setText("Rarity: " + Game.Items.bow.rarity,3);
		Game.Dialog.setText("A curvy bow made from oak wood and high quality string.",4);
	}else if(item.trueName === Game.Items.apple.trueName){
		Game.Dialog.setText("Health Boost: " + Game.Items.apple.healing,2);
		Game.Dialog.setText("Rarity: " + Game.Items.apple.rarity,3);
		Game.Dialog.setText("A big bright red apple.",4);
	}else if(item.trueName === Game.Items.arrow.trueName){
		Game.Dialog.setText("Rarity: " + Game.Items.arrow.rarity,2);
		Game.Dialog.setText("A pointy ass arrow.",3);
	}else if(item.trueName === Game.Items.gold.trueName){
		Game.Dialog.setText("Rarity: " + Game.Items.gold.rarity,2);
		Game.Dialog.setText("A sparkling gold coin",3);
	}else if(item.trueName === Game.Items.potion.trueName){
		Game.Dialog.setText("Health Boost: " + Game.Items.potion.healing,2);
		Game.Dialog.setText("A bright green substance in a vial, it appears to revitalize.",3);
	}else if(item.trueName === Game.Items.silver.trueName){
		Game.Dialog.setText("Silver",2);
	}else if(item.trueName === Game.Items.bronze.trueName){
		Game.Dialog.setText("bronze",2);
	}else{
		Game.Dialog.setText(item.description,2);
	}
	Game.Dialog.setText("Press [E] to interact",6,"green");
}
Game.Dialog.combat = function(){
	var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
	//Game.Dialog.setText("You dealt " + Game.player.damagePerHit + " and Took " + other.damagePerHit,2);
}