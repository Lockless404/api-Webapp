import './style.css';
import {
  getApi, render, Reservation, renderRes, getRes, clearRes, sendRes, getCount
} from './res.js';
import {
  displayPics, showLikes, likeAPic, itemsCounter,
} from './homePage.js';
import CommentsPopUp from './comments.js';

const homepage = document.querySelector('.itemList');
const reservationSection = document.querySelector('.resContainer');

reservationSection.addEventListener('click', async (e) => {
  if (e.target.classList.contains('resClose')) {
    reservationSection.classList.remove('appear');
  }

  if (e.target.classList.contains('resFormBtn')) {
    e.preventDefault();
    const idFull = e.target.parentElement.parentElement.children[4].children[0].innerHTML;
    const id = idFull.replace(/\D/g, '');

    const input = document.querySelectorAll('.resIn');
    const reserver = new Reservation(input[0].value, input[1].value, input[2].value, id);
    clearRes();
    await sendRes(reserver);
    const data = await getRes(id);
    renderRes(data);
  }
});

homepage.addEventListener('click', async (e) => {
  if (e.target.classList.contains('reservations')) {
    const index = e.target.id;
    const plus1 = parseInt(index, 10) + 1;
    const picIds = [1000, 1002, 1003, 1015, 1021, 1022];

    reservationSection.classList.add('appear');
    const data = await getApi(picIds[index]);
    render(data, plus1);
    const resData = await getRes(picIds[index]);
    renderRes(resData);
  }
});

const commentsModule = new CommentsPopUp();
document.addEventListener('DOMContentLoaded', () => {
  displayPics().then(() => {
    showLikes();
    likeAPic();
    itemsCounter();
    const commentBtns = document.querySelectorAll('.commentBtn');
    if (commentBtns) {
      commentBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const itemId = btn.getAttribute('data');
          commentsModule.display(itemId);
        });
      });
    }
  });
});
