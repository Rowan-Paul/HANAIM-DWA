const ufoImageUrl = "https://images2.imgbox.com/90/61/bP8foIzS_o.png";
const bullitImageUrl = "https://images2.imgbox.com/6b/32/GELVjZiO_o.png";
const rocketImageUrl = "https://images2.imgbox.com/a9/ee/3de7UGDe_o.png";

class Ufo extends BouncingSprite {
  constructor(x, y, xSpeed, ySpeed) {
    super(ufoImageUrl, x, y, xSpeed, ySpeed);

    // met een CSS-filter kunnen we deze versie een andere kleur geven
    this.element.style.filter = `hue-rotate( ${Math.random() * 360}deg )`;
  }
}

let player; // Deze variabele moet globaal zijn. Waarom?

function createGameSprites() {
  const allUfos = [
    [350, 225, 1, 2],
    [350, 225, -2, 1],
    [350, 225, 2, -1],
    [350, 225, -1, -2],
    [350, 225, 2, 1],
    [350, 225, -1, 2],
    [350, 225, 1, -2],
    [350, 225, -2, -1]
  ].map(ufoData => new Ufo(...ufoData));
  // de variabele "allUfos" bevat nu een lijst met instanties
  // van de Ufo-klasse, maar met die lijsten hoeven we niets
  // te doen, want de Sprite-klasse houdt nu ook zelf een lijst
  // bij, en gebruikt die lijst om alle Sprites periodiek een
  // update() te laten doen.

  player = new Player();
}

function installKeyboardHandler() {
  // Het "keydown" event kan je gebruiken om alle toetsaanslagen
  // te detecteren, ook van pijltjestoetsen, functietoetsen, shift, ctrl
  // etc.
  // `event.code` zal dan een string bevatten die de ingedrukte toets
  // beschijft. Gebruik http://keycode.info/ om achter de codenamen van
  // toetsen te komen.
  document.addEventListener("keydown", event => {
    if (event.code == "Space") {
      // normaal zal een browser de pagina scrollen als je op de spatiebalk
      // drukt. preventDefault() voorkomt dat.
      event.preventDefault();
      
      new Bullit(player.x + 19, player.y);
    } else if (event.code == "ArrowLeft") {
      player.moveLeft();
    } else if (event.code == "ArrowRight") {
      player.moveRight();
    }
  });
}

const startButton = document.getElementById("startButton");
const titleImg = document.getElementById("titleImage");
const animationDiv = document.getElementById("animationDiv");

startButton.addEventListener("click", () => {
  animationDiv.removeChild(startButton);
  animationDiv.removeChild(titleImage);

  createGameSprites();
  Sprite.startEngine();
  installKeyboardHandler();
});

class Player extends Sprite {
  constructor() {
    super(rocketImageUrl, 60, Sprite.gameHeight - 50, 0, 0);
  }

  update() {
    super.update();
    if (this.x < 0 || this.x > Sprite.gameWidth - this.width) {
      this.xSpeed = 0; 
    }
  }

  moveLeft() {
    if(this.x)
    this.xSpeed = -3;
  }

  moveRight() {
    this.xSpeed = 3;
  }
}

class Bullit extends CollidingSprite {
  constructor(x, y) {
    super(bullitImageUrl, x, y, 0, -8);
  }

  update() {
    super.update();
    if (this.y < 0) {
      this.remove();
    }
  }

  isCollision(otherSprite) {
    return (
      this.x >= otherSprite.x &&
      this.x <= otherSprite.x + otherSprite.width &&
      this.y >= otherSprite.y &&
      this.y <= otherSprite.y + otherSprite.height
    )
  };

  handleCollisionWith(otherSprite) {
    this.remove();
    otherSprite.remove();
  }

}