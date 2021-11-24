import './style.css';
import { getApi, render, Reservation, renderRes, getRes, clearRes, sendRes } from './res.js';
import { getPics } from './homePage.js';

const homepage = document.querySelector('.itemList')
const reservationSection = document.querySelector('.resContainer');

reservationSection.addEventListener('click', async (e) => {
  if (e.target.classList.contains('resClose')) {
    reservationSection.classList.remove('appear');
  }

  if (e.target.classList.contains('resFormBtn')) {
    e.preventDefault();
    const idFull = e.target.parentElement.parentElement.children[4].children[0].innerHTML;
    const id = idFull.replace(/\D/g,'');

    const input = document.querySelectorAll('.resIn')
    const reserver = new Reservation(input[0].value, input[1].value, input[2].value, id);
    clearRes();
    sendRes(reserver);
    const data = await getRes(id);
    renderRes(data);
  }
});


homepage.addEventListener('click', async (e) => {
  if (e.target.classList.contains('reservations')) {
    const source = e.target.id;
    const picIds = [1000, 1002, 1003, 1015, 1021, 1022];

    reservationSection.classList.add('appear');
    const data = await getApi(picIds[source]);
    render(data);
  }
})

document.addEventListener('DOMContentLoaded', () => {
  getPics();  
});
