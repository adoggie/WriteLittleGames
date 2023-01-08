
//游戏控制器，整个游戏只有一个 
class GameController{
	constructor(){
		this.scenes = []; // 场景
		this.nowSceneName = null;
	}

	addScene(scene){
		this.scenes.push(scene); // 添加场景
		this.nowSceneName = scene.name;
	}

	getScene(name){

	}

	getCurrentScene(){
		//return this.scenes[0]; // 得到默认第一个关卡场景
		for(var a = 0;a<this.scenes.length;a++){
			let scene = this.scenes[a]; 
			if(scene.name == this.nowSceneName){
				return scene;
			}

		}
		return null;
	}

	setCurrentScene(name){
		this.nowSceneName = name;


	}
	draw(){
		console.log('--',this.nowSceneName);
		let scene = this.getCurrentScene();
		scene.draw();
	}
}

var gameController = new GameController();
