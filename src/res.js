const getApi = async (id) => {
  const pull = await fetch(`https://picsum.photos/id/${id}/info`);

  const data = await pull.json();
  return data;
};

function render(data, index) {
  const reservatonSection = document.querySelector('.resContainer');
  reservatonSection.innerHTML = `
    <div class="reservation">
      <button class="resClose">x</button>
      <img class="resImg" src="${data.download_url}" alt="">
      <h1 class="resh1">Exibition ${index}</h1>
      <div class="resDetail">
        <p>Author: ${data.author}</p>
        <p>Length: ${data.height}</p>
      </div>
      <div class="resDetail">
        <p>Price $${data.id}</p>
        <p>Width: ${data.width}</p>
      </div>
      <h2 class="resNumber">Reservation</h2>
      <ul class="resList">
        
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
  constructor(username, dateStart, dateEnd, itemId) {
    this.username = username;
    this.date_start = dateStart;
    this.date_end = dateEnd;
    this.item_id = itemId;
  }
}

const renderRes = (reserver) => {
  const resList = document.querySelector('.resList');
  const resNumber = document.querySelector('.resNumber');
  reserver.forEach((reservation) => {
    resList.innerHTML += `
  <li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>
  `;
    resNumber.innerHTML = `Reservations (${reserver.length})`;
  });
};

const getRes = async (id) => {
  const pull = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4FZqlyOYZUYNqbT9zcA9/reservations?item_id=${id}`);

  const data = await pull.json();
  return data;
};

const clearRes = () => {
  const resList = document.querySelector('.resList');
  resList.innerHTML = '';
};

const sendRes = async (reserver) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4FZqlyOYZUYNqbT9zcA9/reservations/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(reserver),
  });
};

export {
  getApi, render, Reservation, renderRes, getRes, clearRes, sendRes,
};
