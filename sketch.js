var towerimg, tower;
var doorimg, doorgroup, door;
var climber, climberimg, climbergroup;
var invisibleblock, invisibleblockgroup;
var ghost, ghostimg;
var spookysound;
var gamestate = "PLAY";



function preload(){
  
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  ghostimg = loadImage("ghost-standing.png")
  spookysound = loadSound("spooky.wav")
}

function setup(){
  
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 1;
  
  doorgroup = new Group();
  climbergroup = new Group();
  invisibleblockgroup = new Group();
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostimg);
  ghost.scale = 0.3;
  
  spookysound.loop()
  
}

function draw(){
  
  background (0);
  
  if(gamestate==="PLAY"){
  
  if(tower.y > 400){
    
    tower.y = 300
    
  }
  
  if(keyDown("left_arrow")){ 
    
    ghost.x = ghost.x - 3; 
    
  }
  
  if(keyDown("right_arrow")){ 
    
    ghost.x = ghost.x + 3; 
    
  }
  
  if(keyDown("space")){ 
    
    ghost.velocityY = -5
    
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbergroup.isTouching(ghost)){
     
     ghost.velocityY = 0
     
     }
  
  if(invisibleblockgroup.isTouching(ghost) || ghost.y > 600){
    
    ghost.destroy();
    gamestate="END";
    
  }
  
  obstacle();
  
  drawSprites();
    
  }
  
  if(gamestate==="END"){
    
    fill("yellow")
    textSize(30);
    text("GameOver", 230, 250)
    spookysound.stop();
    
  }
  
}

function obstacle(){
  
  if(frameCount%240===0){
    
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleblock = createSprite(200, 15);
    invisibleblock.width = climber.width
    invisibleblock.height = 2;
    
    door.x = Math.round(random(120, 400))
    climber.x = door.x;
    invisibleblock.x = door.x;
    door.addImage(doorimg);
    climber.addImage(climberimg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleblock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1
    
    door.lifetime = 800; 
    climber.lifetime = 800; 
    invisibleblock.lifetime = 800;
    
    doorgroup.add(door); 
    invisibleblock.debug = true; 
    climbergroup.add(climber); 
    invisibleblockgroup.add(invisibleblock);
    
  }
}
