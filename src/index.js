import './style.css';
import {
  displayPics, showLikes, likeAPic, itemsCounter,
} from './homePage.js';

document.addEventListener('DOMContentLoaded', () => {
  displayPics().then(() => {
    showLikes();
    likeAPic();
    itemsCounter();
  });
});
