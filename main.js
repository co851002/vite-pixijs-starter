import "./style.css";
import * as PIXI from "pixi.js";

// Initialize PixiJS Application
let app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

console.log(PIXI);
// Load images
PIXI.Assets.add({"image1", "src/assets/background/Top_Layer.png"});
PIXI.Assets.add({"image2", "src/assets/background/Sky.png"});

const texturesPromise = PIXI.Assets.load(["image1", "image2"]);

texturesPromise.then((textures) => {
  const sprite1 = new PIXI.Sprite.from(textures.image1);
  const sprite2 = new PIXI.Sprite.from(textures.image2);
  // Set properties for your sprites (position, anchor, etc.)
  app.stage.addChild(sprite1, sprite2);
});

app.ticker.add(() => {
  sprite1.tilePosition.x -= 0.5; // Move at a slower speed
  sprite2.tilePosition.x -= 1.0; // Move at a faster speed
});
