Game.Console = {
 throwMessage: function(type, msg){
    console.log(type + msg);
 },
 type: function(int){
    if(int == 1 || int == 0){
        return Game.Console.Prefix.Error;
    }else if(int == 2){
        return Game.Console.Prefix.Warning;
    }else if(int == 3){
        return Game.Console.Prefix.Message;
    }else if(int == 4){
        return Game.Console.Prefix.Console;
    }
 }
}

/**
* Sends messages, all uss same properties
* @param {string} msg - the message to print to console
**/
Game.Console.sendMessage = function(msg){
    Game.Console.throwMessage(Game.Console.type(3),msg);
}
Game.Console.sendError = function(msg){
    Game.Console.throwMessage(Game.Console.type(1),msg);
}
Game.Console.sendWarning = function(msg){
    Game.Console.throwMessage(Game.Console.type(2),msg);
}
Game.Console.sendCommand = function(msg){
    Game.Console.Messages.pushMessage(msg);
}
Game.Console.Console = function(msg){
    Game.Console.throwMessage(Game.Console.type(4),msg);
}

Game.Console.Prefix = {};
Game.Console.Prefix.Message = "Message: ";
Game.Console.Prefix.Error = "Error: ";
Game.Console.Prefix.Warning = "Warning: ";
Game.Console.Prefix.Command = "Command: ";
Game.Console.Prefix.Console = "";


