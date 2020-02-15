var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#00000',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

var getTime;

var is_immortal = false;

function preload ()
{

    this.load.image('ship', 'assets/Millienium.png');
    this.load.image('asteroid', 'assets/asteroid.png');
    this.load.image('bg', 'assets/space.png');
    this.load.image('glow', 'assets/glow.png')
    this.load.image('powerUp', 'assets/powerUp.png')
    this.load.image('powered', 'assets/powered.png')
    this.load.image('gameOver','assets/gameOver.png')
}

function create ()
{



    this.add.image(400, 300, 'bg');
   

    this.leftKey = this.input.keyboard.addKey('LEFT');
    this.rightKey = this.input.keyboard.addKey('RIGHT');
    this.spaceKey = this.input.keyboard.addKey('SPACE');

    this.gameOver = this.add.image(400, -500, 'gameOver');
    this.ship1 = this.add.image(config.width / 2, config.height / 2 + 20, "ship");
    this.ship1.x = config.width / 2;
    this.ship1.y = config.height - 40;

    

    this.randomX = Phaser.Math.Between(-10, 0);


    // this.asteroid = [];
    // for(let i = 0; i < 10; i++) {
    //   this.asteroid[i] = this.add.image(i * 40, i * 50, "asteroid");
    // }
   



    this.asteroid = this.add.image(140, 50, 'asteroid');
   this.asteroid1 = this.add.image(400, 10, 'asteroid');

   this.powerUp = this.add.image(400, -1700, 'powerUp');

    this.glow = this.add.image(300, 10, 'glow');
    this.glow1 = this.add.image(450, 200, 'glow');
    this.glow2 = this.add.image(350, 300, 'glow');
    this.glow3 = this.add.image(60, 400, 'glow');
}




function update (time)
{   
   // console.log(time)
    //randomizer Speed
    this.randomS = Phaser.Math.Between(2, config.width);
    this.randomS1 = Phaser.Math.Between(2, config.width);
    this.randomS2 = Phaser.Math.Between(2, config.width);
    this.randomS3 = Phaser.Math.Between(2, config.width);

    //randomizer X pos
    this.randomX = Phaser.Math.Between(0, config.width);

    //asteroid0
    if (this.asteroid.y > config.height + 40) {
        this.asteroid.y = -20;
        this.asteroid.x = this.randomX;
    } else if (this.asteroid.y < config.height + 41) {
        this.asteroid.y += 4;
    }

    //powerUp


    if (this.powerUp.y > config.height + 40) {
        this.powerUp.y = -1700;
        this.powerUp.x = this.randomX;
    } else if (this.powerUp.y < config.height + 41) {
        this.powerUp.y += 4;
    }


    
    //asteroid1
    if (this.asteroid1.y > config.height + 40) {
        this.asteroid1.y = -20;
        this.asteroid1.x = this.randomX;
    } else if (this.asteroid1.y < config.height + 41) {
        this.asteroid1.y += 4;
    }
    //glow
    if (this.glow.y > config.height + 40) {
        this.glow.y = -20;
        this.glow.x = this.randomS;
    } else if (this.glow.y < config.height + 41) {
        this.glow.y += 10;
    }
    //glow
    if (this.glow1.y > config.height + 40) {
        this.glow1.y = -20;
        this.glow1.x = this.randomS1;
    } else if (this.glow1.y < config.height + 41) {
        this.glow1.y += 10;
    }
    //glow
    if (this.glow2.y > config.height + 40) {
        this.glow2.y = -20;
        this.glow2.x = this.randomS2;
    } else if (this.glow2.y < config.height + 41) {
        this.glow2.y += 10;
    }
    //glow
    if (this.glow3.y > config.height + 40) {
        this.glow3.y = -20;
        this.glow3.x = this.randomS3;
    } else if (this.glow3.y < config.height + 41) {
        this.glow3.y += 20;
    }    


    // //hit
    if (is_immortal == false) {
        if (this.ship1.x < this.asteroid.x + this.asteroid.width &&
            this.ship1.x + this.ship1.width > this.asteroid.x &&
            this.ship1.y < this.asteroid.y + this.asteroid.height &&
            this.ship1.y + this.ship1.height > this.asteroid.y){
            
                this.ship1.destroy(true);
    
                if(this.gameOver.y >= 300){
        
                    this.gameOver.y = 300;
                    this.ship1.x = 10000000;
    
                }
                else{
                    this.gameOver.y += 100;
                }
                
    
    
                console.log("Hit!");
    
                
            }
            else if (this.ship1.x < this.asteroid1.x + this.asteroid1.width &&
                this.ship1.x + this.ship1.width > this.asteroid1.x &&
                this.ship1.y < this.asteroid1.y + this.asteroid1.height &&
                this.ship1.y + this.ship1.height > this.asteroid1.y){
                   
                    this.ship1.destroy(true);
                       
    
    
                    if(this.gameOver.y >= 300){
        
                        this.gameOver.y = 300;
                        this.ship1.x = 10000000;
        
                    }
                    else{
                        this.gameOver.y += 100;
                    }
                    
                }
    }
    
    
    //poweredUp


    
    if (this.ship1.x < this.powerUp.x + this.powerUp.width &&
        this.ship1.x + this.ship1.width > this.powerUp.x &&
        this.ship1.y < this.powerUp.y + this.powerUp.height &&
        this.ship1.y + this.ship1.height > this.powerUp.y){
            
            getTime = time;


            addedTime = getTime + 5000;
            //console.log('This is the time [ ' + time + ' ] | This is added time [ ' + addedTime + ' ]' );
console.log(typeof(time));
console.log(typeof(addedTime));
            this.ship1.setTexture('powered');
            is_immortal = true;

            if (is_immortal == true) {
                
                if(time == addedTime){

                    is_immortal = false;
                    this.ship1.setTexture('ship');
                    console.log("akshfvs f");

                }

    
           
            console.log("nice!");

            } else if (is_immortal == false) {
                if (this.ship1.x < this.asteroid.x + this.asteroid.width &&
        this.ship1.x + this.ship1.width > this.asteroid.x &&
        this.ship1.y < this.asteroid.y + this.asteroid.height &&
        this.ship1.y + this.ship1.height > this.asteroid.y){
        
            this.ship1.destroy(true);

            if(this.gameOver.y >= 300){
    
                this.gameOver.y = 300;
                this.ship1.x = 10000000;

            }
            else{
                this.gameOver.y += 1;
            }
            


            console.log("Hit!");

            
        }
        else if (this.ship1.x < this.asteroid1.x + this.asteroid1.width &&
            this.ship1.x + this.ship1.width > this.asteroid1.x &&
            this.ship1.y < this.asteroid1.y + this.asteroid1.height &&
            this.ship1.y + this.ship1.height > this.asteroid1.y){
               
                this.ship1.destroy(true);
                   


                if(this.gameOver.y >= 300){
    
                    this.gameOver.y = 300;
                    this.ship1.x = 10000000;
    
                }
                else{
                    this.gameOver.y += 100;
                }
                
            }
            }
            

            
        }



    if(this.leftKey.isDown && this.ship1.x < 40) {
    } else if(this.leftKey.isDown) {
      this.ship1.x -= 5;
    }
    if(this.rightKey.isDown && this.ship1.x > config.width - 40) {
    } else if(this.rightKey.isDown) {
      this.ship1.x += 5;
    }
    
     if(this.spaceKey.isDown && this.ship1.x > config.width - 40) {
    } else if(this.spaceKey.isDown) {
      this.asteroid.y += 20;
      this.asteroid1.y += 20;
    }
}