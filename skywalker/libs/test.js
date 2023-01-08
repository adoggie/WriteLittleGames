


function preload() {
    // ResourceManager.instance = new ResourceManager();
    // ResourceManager.instance.init();
    // resourceManager = ResourceManager.instance;
    // Director.instance.init();
    // img = loadImage('assets/spitfireu4.png');

    img_bg = loadImage('assets/background.png');
    img = loadImage('assets/plane.png');
}


function setup() {
    createCanvas(400,600);
    return ;
    print("test...");
    StageManager.instance.init();
    Director.instance.setup();
    StageManager.instance.get().setup();
}

function draw() {
    background('red');
    //StageManager.instance.get().draw();
}