Game.myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
		//So the screen will always be the size of the window
		window.addEventListener('resize', Game.resizeCanvas, false);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(Game.updateGameArea, 20);
		this.canvas.bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                    Game.handleInput(event, e);
            });
        };
		if(!Game.hasBinded){
			// Bind keyboard input events
			this.canvas.bindEventToScreen('keydown');
			//bindEventToScreen('keyup');
			this.canvas.bindEventToScreen('keypress');
			Game.hasBinded = true;
		}
        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	getWidth : function(){
		return 1000;
	},
	getHeight : function(){
		return 500;
	}
}
Game.resizeCanvas = function(){
		window.resizeTo(1060,570);
}