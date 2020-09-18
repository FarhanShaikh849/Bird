var SERVE =1;
var MIDPLAY = 0;
var PLAY = -1;
var END = -2;
var FINALEND = -3;
var FINALOVER = -4;
var gameState = SERVE;

var img;
var bird;
var pollution;
var edge1,edge2; 
var tree, tree2, tree1Image, tree2Iamge;

var pollutionsGroup;

var score = 0;

localStorage["HighestScore"] = 0;

function preload(){
  url = "animated-bird-image-0250.gif";
  birdImg = loadImage(url);
  
  url2 = "gameOver.gif";
  gameOverImg = loadImage(url2);
  
  pollution2Img = loadImage("pollutionImg2.png");
  pollution3Img = loadImage("pollutionImg3.png");
  
  tree1Image = loadImage("tree.png");
  tree2Image = loadImage("tree00.png");
  
  background0Img = loadImage("backgroundImg.png")
  
}

function setup() {
  createCanvas(650, 400);
  
  tree = createSprite(440,200,0,0);
  tree.addImage(tree1Image);
  tree.scale = 0.8;
  tree.visible = false;
  
  tree2 = createSprite(510,220,20,20);
  tree2.addImage(tree2Image);
  tree2.scale = 0.6;
  tree2.visible = false;
  
  bird = createSprite(80,250,0,0);
  bird.addImage(birdImg);
  
  bird.setCollider("circle",0,0,30);
  //bird.debug = true;
  
  edge1 = createSprite(325,0,650,5);
  edge1.visible = false;
  
  edge2 = createSprite (325,400,650,5);
  edge2.visible = false;
  
  gameOver = createSprite(325,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  pollutionsGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(background0Img);
  
if(gameState === PLAY){
  
  bird.visible = true;
  
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);
  
  score = score + Math.round(getFrameRate()/60);
  
  text("HighScore: "+ localStorage["HighestScore"],335,50);
  
  if(keyDown("UP_ARROW")){
  bird.y = bird.y -6;
  }
  
  if(keyDown("DOWN_ARROW")){
  bird.y =bird.y +6;
  }
  
  if(pollutionsGroup.isTouching(bird)){
  gameState = END;   
  }
  
  if(score === 500){
  gameState = FINALEND;
  }
  
  pollutions();
  
} else if(gameState === END){
  
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);
  
  textSize(20);
  stroke("black");
  strokeWeight(0);
  text("HighScore: "+ localStorage["HighestScore"],335,50);
  
  textSize(25);
  stroke("black");
  strokeWeight(2);
  text("R.I.P FOR THE BIRD.",205,80);
  text("Press SPACE To Restart.",200,320);
  
  gameOver.visible = true;
  
  pollutionsGroup.setVelocityXEach(0);
  
  if(keyDown("space")){
  reset();
  }
  
} else if(gameState === SERVE){
  
  bird.visible = false
  
  textSize(25);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Story: ",10,50);
  text("Press X To See Instructions.",165,380);
  
  text("There was a man who used to sell birds.",90,50);
  text("But one day a bird successfully escaped",90,90);
  text("from him and now she is heading towards",90,130);
  text("her home to meet her family once again!",90,170);
  text("But there is a PROBLEM. The pollution in",90,210);
  text("the air created by us ''Humans'' can kill her.",90,250);
  text("Now its your responsiblity to help her in",90,290);
  text("reaching her home/family . ALL THE BEST.",90,330);
  
  if (keyDown("x")){
   gameState = MIDPLAY; 
  }
  
} else if(gameState === MIDPLAY){
          
  bird.visible = false;
  
  textSize(30);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Instructions:",240,50);

  textSize(25);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Press ''UP ARROW'' to move the bird up.",20,90);
  text("Press ''DOWN ARROW'' to move the bird down.",20,130);
  text("Be aware! Don't touch the cloud. They are poisonous."         ,20,170);
  text("When your score will be 500, you will reach ur home.!",20,210);
  text("Press W To Start The Game",165,380);
  
  textSize(30);
  fill("black");
  stroke("black");
  strokeWeight(2);
  text("ALL THE BEST FOR THE JOURNEY",75,290);
  
  if(keyDown("w")){
  gameState = PLAY;
  }

} else if(gameState === FINALEND){
  
  pollutionsGroup.destroyEach();
  
  bird.y = 250;
  bird.velocityX = 2;
  
  tree.visible = true;
  tree2.visible = true;
  
  var invisibleGround = createSprite(460,270,50,5);
  invisibleGround.visible = false;
  
  if(bird.isTouching(invisibleGround)){
   bird.velocityX = 0;
   gameState = FINALOVER;
  }
  
} else if(gameState === FINALOVER){
 
  bird.visible = false;
  tree.visible = false;
  tree2.visible  = false;
  
  textSize(40);
  fill("red")
  stroke("red")
  strokeWeight(3);
  text("THE END",240,50)
  
  textSize(25);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("CONGRATS! YOU HAVE SUCCESFULLY HELPED THE",10,100);
  text("BIRD TO REACH HER HOME. A VERY VERY SPECIAL",10,140);
  text("THANKS FROM THE BIRD :) TO HELP HER TO REACH",10,180);
  text("HOME AND NOT LETTING HER DIE FROM THE AIR",10,220);
  text("MIXED WITH POLLUTION. AND OF COURCE TRY NOT",10,260);
  text("TO POLLUTE THE AIR AND LET EVERYONE LIVE",10,300);
  text("PEACEFULLY. THANKS FOR PLAYING!",10,340);
  
}
  
  if(localStorage["HighestScore"]<score) {
  localStorage["HighestScore"] = score;
  }
  
  createEdgeSprites();
  
  bird.bounceOff(edge1);
  bird.bounceOff(edge2);

  drawSprites();
}

function pollutions(){
if(frameCount % 80 === 0){
pollution = createSprite(600,200,0,0); 
pollution.y = Math.round(random(50,350));

 pollution0 = Math.round(random(1,2));
 switch(pollution0) {
 case 1: pollution.addImage(pollution2Img);
         break;
 case 2: pollution.addImage(pollution3Img);
         break;
 default: break;
 }
  
  pollution.velocityX = -(5 + 3*score/200);
  
  pollution.scale = 0.15;
  
  pollutionsGroup.add(pollution);
  
}
}

function reset(){
gameOver.visible = false;

pollutionsGroup.destroyEach();

score = 0;
  
gameState = PLAY;
 }