import apiKeyInvolvment from "./apiKey.js";

const picIds = [1000, 1002, 1003, 1015, 1021, 1022];

const getImages = async () => {
  const pics =[]
  for(let i = 0; i < picIds.length; i++){
    const urlToFetch= `https://picsum.photos/id/${picIds[i]}/info`
    const images = await fetch(urlToFetch)
    .then((res) => res.json())
    .then((resData) => resData)
    .catch((err) => err);
  pics.push(images)
  }
  return pics;
}

const getPics = async () => {
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
          <p>Exhibition ${idx}</p>
          <button id=${idx} class='likes'>Likes</button>
        </div>
        <button type='button' class='comments'>Comments</button>
        <button type='button' class='reservations'>Reservations</button>
      </div>
      `;
      if (idx < 3) {
        rowOne.appendChild(listItem);
      } else {
        rowTwo.appendChild(listItem);
      };
      idx += 1;
    })
  })
  picSection.append(rowOne, rowTwo);
};

const apiLikeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKeyInvolvment}/likes`;

const postLikes = async (picId) => {
  const currLikes = await fetch(apiLikeUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: picId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return currLikes;
};

getImages();

const showLikes = async () => {
  const currItem = await fetch(apiLikeUrl)
    .then((resp) => resp.json())
    .then((data) => data);
  console.log(currItem)
  const allLikes = document.getElementsByClassName('.likes');
  console.log(allLikes)
}

export { getPics, postLikes, showLikes };
