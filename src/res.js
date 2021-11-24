const getApi = async (id) => {
  const pull = await fetch(`https://picsum.photos/id/${id}/info`);

  const data = await pull.json();
  return data;
};

function render(data) {
  const reservatonSection = document.querySelector('.resContainer');
  reservatonSection.innerHTML = `
    <div class="reservation">
      <button class="resClose">x</button>
      <img class="resImg" src="${data.download_url}" alt="">
      <h1 class="resh1">Exibition 3</h1>
      <div class="resDetail">
        <p>Author: ${data.author}</p>
        <p>Length: ${data.height}</p>
      </div>
      <div class="resDetail">
        <p>Price $${data.id}</p>
        <p>Width: ${data.width}</p>
      </div>
      <h2>Reservation</h2>
      <ul class="resList">
        <li>03/11/2021 - 03-12-2021 Alex</li>
        <li>03/14/2021 - 03/16/2021 by Mia</li>
      </ul>
      <h2>Add a reservation</h2>
      <form class="resForm" action="#">
        <div class="resInputWhole">
          <p>Your name:</p>
          <input class="resIn" type="text">
        </div>
        <div class="resInputWhole">
          <p>Start date:</p>
          <input class="resIn" type="date">
        </div>
        <div class="resInputWhole">
          <p>End date:</p>
          <input class="resIn" type="date">
        </div>
        <button class="resFormBtn">Reserve</button>
      </form>
    </div>
  `;
}


class Reservation {
  constructor(username, date_start, date_end, item_id) {
    this.username = username;
    this.date_start = date_start;
    this.date_end = date_end;
    this.item_id = item_id;
  }
}

const renderRes = (reserver) => {
  const resList = document.querySelector('.resList');
  reserver.forEach((reservation) => {
    resList.innerHTML += `
  <li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>
  `;
  });
}

const getRes = async (id) => {
  const pull = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4FZqlyOYZUYNqbT9zcA9/reservations?item_id=${id}`);

  const data = await pull.json();
  return data;
}

const clearRes = () => {
  const resList = document.querySelector('.resList');
  resList.innerHTML = '';
}

const sendRes = async (reserver) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4FZqlyOYZUYNqbT9zcA9/reservations/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(reserver),
  }).then((res) => res.json());
}







export { getApi, render, Reservation, renderRes, getRes, clearRes, sendRes };
