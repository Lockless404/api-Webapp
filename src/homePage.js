import apiKeyInvolvment from './apiKey.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const picIds = [1000, 1002, 1003, 1015, 1021, 1022];

const getImages = async () => {
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

const displayPics = async () => {
  const res = await getImages().then((it) => {
    const picSection = document.getElementById('item-list');
    const rowOne = document.createElement('div');
    const rowTwo = document.createElement('div');
    rowOne.setAttribute('class', 'f-row');
    rowTwo.setAttribute('class', 'f-row');
    let idx = 0;
    it.forEach(() => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<div class='f-col'>
        <img src='${it[idx].download_url}' alt=''>
        <div class='f-row title'>
          <p>Exhibition ${idx + 1}</p>
          <div class='f-col like'>
            <button id='like-${idx}' class='up' data='${idx}'><i class="far fa-thumbs-up"></i></button>
            <button id='btn-${idx}' class='likes'>Likes</button>
          </div>
        </div>
        <button type='button' class='commentBtn' data='${idx}'>Comments</button>
        <button type='button' class='reservations'>Reservations</button>
      </div>
      `;
      if (idx < 3) {
        rowOne.appendChild(listItem);
      } else {
        rowTwo.appendChild(listItem);
      }
      idx += 1;
    });
    picSection.append(rowOne, rowTwo);
    return true;
  });
  return res;
};

const apiLikeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKeyInvolvment}/likes`;

const postLikes = async (imgId) => {
  const resp = await fetch(apiLikeUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: imgId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((data) => data.text())
    .then((res) => res)
    .catch(() => 'error');
  return resp;
};

const getLikes = async () => {
  const currItemLikes = await fetch(apiLikeUrl)
    .then((resp) => resp)
    .then((data) => data.json());
  return currItemLikes;
};

const showLikes = () => {
  getLikes().then((img) => {
    for (let i = 0; i < img.length; i += 1) {
      const currLikes = img[i].likes;
      const likeBtn = document.querySelector(`#btn-${i}`);
      likeBtn.innerHTML = `${currLikes} Likes`;
    }
  });
};

const likeAPic = () => {
  getLikes().then((img) => {
    const likeBtns = document.getElementsByClassName('up');
    for (let i = 0; i < img.length; i += 1) {
      const btn = likeBtns[i];
      btn.addEventListener('click', async () => {
        await postLikes(img[i].item_id);
        await showLikes();
      });
    }
  });
};

const itemsCounter = () => {
  const numOfItems = picIds.length;
  const showcase = document.getElementsByTagName('li')[0];
  showcase.innerHTML = `Showcase (${numOfItems})`;
};

export {
  displayPics, postLikes, showLikes, likeAPic, itemsCounter,
};
