const picIds = [1000, 1002, 1003, 1015, 1021, 1022];

const getImages = () => {
  const pics = [];
  for (let i = 0; i < picIds.length; i += 1) {
    const urlToFetch = `https://picsum.photos/id/${picIds[i]}/info`;
    const images = fetch(urlToFetch)
      .then((res) => res.json())
      .then((resData) => resData)
      .catch((err) => err);
    pics.push(images);
  }
  return Promise.all(pics);
};

const getPics = () => {
  const picSection = document.getElementById('item-list');
  const rowOne = document.createElement('div');
  const rowTwo = document.createElement('div');
  rowOne.setAttribute('class', 'f-row');
  rowTwo.setAttribute('class', 'f-row');
  let idx = 0;

  getImages().then((it) => {
    it.forEach(() => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<div class='f-col'>
        <img src='${it[idx].download_url}' alt=''>
        <div class='f-row'>
          <p>Exhibition ${idx + 1}</p>
          <button id='${idx}' class='likes'>Likes</button>
        </div>
        <button type='button' class='comments'>Comments</button>
        <button type='button' id='${idx}' class='reservations'>Reservations</button>
      </div>
      `;
      if (idx < 3) {
        rowOne.appendChild(listItem);
      } else {
        rowTwo.appendChild(listItem);
      }
      idx += 1;
    });
  });
  picSection.append(rowOne, rowTwo);
};

export default getPics;
