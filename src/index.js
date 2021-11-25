import './style.css';
import { getApi, render } from './res.js';
import { displayPics, postLikes, showLikes, likeAPic } from './homePage.js';

const reservationButton = document.querySelector('.reservation');

// reservationButton.addEventListener('click', async () => {
//   const reservatonSection = document.querySelector('.resContainer');
//   reservatonSection.classList.add('appear');
//   const data = await getApi();
//   render(data);
// });

document.addEventListener('DOMContentLoaded', () => {
  displayPics();
  showLikes();
  likeAPic();
});
