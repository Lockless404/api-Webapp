import './style.css';
import { getApi, render } from './res.js';
import { getPics } from './homePage.js';

const homepage = document.querySelector('.itemList')
const reservationSection = document.querySelector('.resContainer');

reservationSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('resClose')) {
    reservationSection.classList.remove('appear');
  }
})

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
