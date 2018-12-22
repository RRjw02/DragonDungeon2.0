Game.Items = {};
Game.getRandomItem = function(){
    var keys = Object.keys(Game.Items);
	var copy = Game.CopyItem(Game.Items[keys[ keys.length * Math.random() << 0]]);
    return copy;
}
Game.CopyItem = function(item){
  let objCopy = {};
  let key;
  for (key in item) {
    objCopy[key] = item[key];
  }
  return objCopy;
}
Game.Items.sword = {
	name : "sword",
	trueName : "sword",
	attack : 10,
	isBroken : false,
	rarity : 1,
	isEquiptable : true,
	isEquipped : false,
	use : function(){
		this.equipt();
	},
	equipt : function(){this.isEquipped = true; this.name = "sword [equipped]"; Game.player.damagePerHit += this.attack},
	unequipt : function(){this.isEquipped = false; this.name = "sword"; Game.player.damagePerHit -= this.attack}
}
Game.Items.note_start = {
	name : "Note",
	trueName : "Note",
	attack : 0,
	isBroken : false,
	rarity : 0,
	isConsumable : false,
	use : function(){},
	equipt : function(){}
}
Game.Items.bow = {
	name : "bow",
	trueName : "bow",
	attack : 15,
	isBroken : false,
	ammo : "arrow",
	rarity : 2,
	isConsumable : false,
	use : function(){},
	equipt : function(){}
}
Game.Items.apple = {
	name : "apple",
	trueName : "apple",
	healing : 5,
	rarity : 0.2,
	isConsumable : true,
	use : function(){
		Game.player.health += 5;
	},
	equipt : function(){}
}
Game.Items.arrow = {
	name : "arrow",
	trueName : "arrow",
	rarity : 0.5,
	stack : 1,
	maxStack : 60,
	isConsumable : false,
	use : function(){},
	equipt : function(){}
}
Game.Items.gold = {
	name : "gold",
	trueName : "gold",
	rarity : 4,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	use : function(){
		Game.player.score += 20;
	},
	equipt : function(){}
}
