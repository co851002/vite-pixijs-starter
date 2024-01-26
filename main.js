import './style.css'
import * as PIXI from 'pixi.js';

import viteLogo from './public/logo-with-shadow.png'

import { Application, Assets, Sprite } from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);


// Create a new PIXI sprite for the gradient
let sprite = new PIXI.Sprite();

// Add the sprite to the container
app.stage.addChild(sprite);

// Convert hexadecimal color values to normalized RGB color values
function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b, 1.0];
}

// Define your colors
let color1 = hexToRgb("#47caff"); // #47caff
let color2 = hexToRgb("#bd34fe"); // #bd34fe

let filter = new PIXI.Filter(null,`
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform vec4 color1;
    uniform vec4 color2;
    void main(void)
    {
      float angle = radians(10.0);
      float gradient = (vTextureCoord.x * cos(angle) - vTextureCoord.y * sin(angle)) / 2.0 + 0.5;
        vec4 color = mix(color1, color2, gradient);
        gl_FragColor = color;
    }
`, {
    color1: color1,
    color2: color2
});

// Apply the filter to the sprite
sprite.filters = [filter];

// Set the sprite to cover the entire application
sprite.width = app.renderer.width;
sprite.height = app.renderer.height;

// load the texture we need
const texture = await Assets.load(viteLogo);

// This creates a texture from a 'bunny.png' image
const vite = new Sprite(texture);
// Set the width of the sprite
vite.width = 400;

// Adjust the height based on the texture's aspect ratio
vite.height = vite.width * (vite.texture.height / vite.texture.width);

// Setup the position of the bunny
vite.x = app.renderer.width / 2;
vite.y = app.renderer.height / 2;

// Rotate around the center
vite.anchor.x = 0.5;
vite.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(vite);

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    // vite.rotation += 0.05;
});