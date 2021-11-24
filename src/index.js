import './style.css';
import { getApi, render } from './res.js';
import { getPics, postLikes, showLikes } from './homePage.js';

const reservationButton = document.querySelector('.reservation');

reservationButton.addEventListener('click', async () => {
  const reservatonSection = document.querySelector('.resContainer');
  reservatonSection.classList.add('appear');
  const data = await getApi();
  render(data);
});

getPics();
showLikes();
