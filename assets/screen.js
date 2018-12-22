Game.Screen = {};
Game.Screen.getWidth = function(){
     return 1200;
}
Game.Screen.getHeight = function(){
     return 700;
}
Game.Screen.rezise = function(width,height){
  window.resizeTo(width,height);
}
