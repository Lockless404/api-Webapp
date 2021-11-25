import './style.css';
import { displayPics, showLikes, likeAPic } from './homePage.js';

document.addEventListener('DOMContentLoaded', () => {
  displayPics().then(() => {
    showLikes();
    likeAPic();
  });
});
