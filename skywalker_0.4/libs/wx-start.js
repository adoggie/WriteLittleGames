/**
 * loadImage
 * should import p5RefactorUtil
 */
import p5 from './p5.min.0.7.3.js';
import './p5RefactorUtil.js';
import  './p5.collide2d.js';

// import p5snd from '../libs/p5.sound.min.js';
import {preload,setup,draw,game_configs} from './start.js'

window.preload = function () {
  game_configs.run_mode='wx';
  preload();
};

// The statements in the setup() function
// execute once when the program begins
window.setup = function() {

  setup();
  //should set visible manually
  canvas.style.visibility = 'visible';

};

window.draw = function() {
  draw();

};

new p5(); 