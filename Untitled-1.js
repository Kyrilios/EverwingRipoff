var config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#bfcc00',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var snake;
var cursors;
var food;
var score = 0;
var score_limit = 100;

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/snake.png');
}

function create ()
{

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '18px', fill: '#fff' });
    

    var Food = new Phaser.Class({
 
        Extends: Phaser.GameObjects.Image,
  
        initialize:
  
        function Food (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)
  
            this.setTexture('food');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);
  
            this.total = 0;
  
            scene.children.add(this);
        },
        eat : function()
        {
            this.total++;

            var x = Phaser.Math.Between(0,39);
            var y = Phaser.Math.Between(0,29);

            this.setPosition(x * 16, y *  16);
        }
  
    });
    var Snake = new Phaser.Class({
        //initialize object
        initialize:

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setOrigin(0);

            this.alive = true;
            this.speed = 100;
            
            this.moveTime = 0;

            this.heading = RIGHT;
            this.direction = RIGHT;

            this.tail = new Phaser.Geom.Point(x, y);
           
        },

        update: function (time)
        {
            
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },
        faceLeft: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = LEFT;
            }
        },

        faceRight: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = RIGHT;
            }
        },

        faceUp: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = UP;
            }
        },

        faceDown: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = DOWN;
            }
        },

        move: function (time)
        {
            
            /**
            * Based on the heading property (which is the direction the pgroup pressed)
            * we update the headPosition value accordingly.
            * 
            * The Math.wrap call allow the snake to wrap around the screen, so when
            * it goes off any of the sides it re-appears on the other.
            */
            switch (this.heading)
            {
                case LEFT:
                    this.headPosition.x = this.headPosition.x - 1, 0, 40;
                    if (this.headPosition.x < 1){
                        this.alive = false;
                    }
                    break;

                case RIGHT:
                    this.headPosition.x = this.headPosition.x + 1, 0, 40;
                    if (this.headPosition.x > 38){
                        this.alive = false;
                    }
                    break;

                case UP:
                    this.headPosition.y = this.headPosition.y - 1, 0, 30;
                    if (this.headPosition.y < 1){
                        this.alive = false;
                    }
                    break;

                case DOWN:
                    this.headPosition.y = this.headPosition.y + 1, 0, 30;
                    if (this.headPosition.y >28){
                        this.alive = false;
                    }
                    break;
            }

        
            this.direction = this.heading;

            //  Update the body segments
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);
            
            for (let i = 1; i < this.body.getChildren().length; i++)
            {
                if (this.head.x === this.body.getChildren()[i].x && this.head.y === this.body.getChildren()[i].y )
                {
                    
                    console.log('dead');
                    this.alive = false;
                    
                }
                
            }
            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;

            
        },

        collideWithfood: function (food)
        {
            if(this.head.x === food.x && this.head.y === food.y){
                this.grow();
                food.eat();
            }else{
                return false;
            }
        },
        grow: function()
        {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
            score += 10;
            newPart.setOrigin(0);
        },

        

    });
    food = new Food(this, 38, 2);
    snake = new Snake(this, 8  , 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{

    if (food.x > 10 && food.y <33){
        food.x-= 15;
    }
    
    if (food.x < 11 && food.y < 450){
        food.y += 15;
    }

    if (food.y > 450 && food.x < 610){
        food.x +=  15;
    }
    if (food.y > 32 && food.x > 610){
        food.y -= 15;
    } 

    if (!snake.alive)
    {
        return;
    }

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */

    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }

    if (score == score_limit)
        {
            snake.speed = snake.speed - 5;   
            score_limit = score_limit * 2;
            console.log(score_limit);
        }

    snake.collideWithfood(food);
    this.scoreText.setText('Score: ' + score);
    snake.update(time);
}