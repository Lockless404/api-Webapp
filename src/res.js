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

export { getApi, render };
