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