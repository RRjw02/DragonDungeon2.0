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
//A much easier way to create Items
//declare a new item as this
// Game.Items.example = new Game.createItem("example","example","exampledescription",function(){});
// when run through typeof it will return "object"
Game.createItem = function(name,trueName,description,use){
	this.name = name;
	this.trueName = name;
	this.description = description;
	this.use = use;
	var Item = {
		name : this.name,
		trueName : this.trueName,
		description : this.description,
		use : this.use
	};
	return Item;
}
//All items
Game.Items = {};
Game.Items.sword = {
	name : "sword",
	trueName : "sword",
	cooldown : 3,
	cooldown_1 : 0,
	attack : 10,
	isBroken : false,
	rarity : 1,
	isEquiptable : true,
	isEquipped : false,
	description : "A well made sword lays on the floor were your standing.",
	use : function(){
		this.equipt();
	},
	equipt : function(){
		if(this.cooldown > this.cooldown_1){
			this.cooldown_1++;
			if(this.isEquipped){
				this.name = "Click again to unequipt";
			}else{
				this.name = "Click again to equipt";
			}
			//if(this.cooldown == this.cooldown_1){
			//	this.equipt();
			//}
		}else{
			this.cooldown_1 = 0;
			if(this.isEquipped){
				this.isEquipped = false;
				this.name = "sword";
				Game.player.damagePerHit -= this.attack;
			}else{
				this.isEquipped = true;
				this.name = "sword [equipped]";
				Game.player.damagePerHit += this.attack;
			}
		}
		
	},
	unequipt : function(){
		this.isEquipped = false;
		this.name = "sword";
		Game.player.damagePerHit -= this.attack;
	}
}
Game.Items.note_start = {
	name : "Note",
	trueName : "Note",
	attack : 0,
	isBroken : false,
	rarity : 0,
	isConsumable : true,
	description : "Welcome to Dragon Dungeon 2!",
	use : function(){},
	equipt : function(){}
}
/*
//Example on how to use Game.createItem to define a new Item
Game.Items.bow = new Game.createItem();
Game.Items.bow.name = "bow";
Game.Items.bow.trueName = "bow";
Game.Items.bow.attack = 15;
Game.Items.bow.isBroken = false;
Game.Items.bow.ammo = "arrow";
Game.Items.bow.rarity = 2;
Game.Items.bow.isConsumable = false;
Game.Items.bow.description = "A curvy bow made from oak wood and high quality string.";
Game.Items.bow.use = function(){
	
};
Game.Items.bow.equipt = function(){
	
};
*/
Game.Items.bow = {
	name : "bow",
	trueName : "bow",
	attack : 15,
	isBroken : false,
	ammo : "arrow",
	rarity : 2,
	isConsumable : true,
	description : "A curvy bow made from oak wood and high quality string.",
	use : function(){},
	equipt : function(){}
}
Game.Items.apple = {
	name : "apple",
	trueName : "apple",
	healing : 5,
	rarity : 0.2,
	isConsumable : true,
	description : "A big bright red apple.",
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
	isConsumable : true,
	description : "A pointy ass arrow.",
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
	description : "A sparkling gold coin",
	use : function(){
		Game.player.score += 20;
	},
	equipt : function(){}
}
Game.Items.potion = {
	name : "health_potion",
	trueName : "Potion of healing",
	rarity : 2.5,
	stack : 1,
	healing: 20,
	isConsumable : true,
	maxStack : 4,
	description : "A bright green substance in a vial, it appears to revitalize.",
	use : function(){
		Game.player.health += 20;
	},
	equipt : function(){},
	unequipt : function(){}
}
Game.Items.silver = {
	name : "silver",
	trueName : "silver",
	rarity : 3,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	use : function(){
		Game.player.score += 15;
	},
	equipt : function(){},
	unequipt : function(){}
}
Game.Items.bronze = {
	name : "bronze",
	trueName : "bronze",
	rarity : 2.5,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	use : function(){
		Game.player.score += 10;
	},
	equipt : function(){},
	unequipt : function(){}
}