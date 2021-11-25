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

const displayPics = () => {
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
          <div class='f-col'>
            <button id='like-${idx}' class='up'><i class="far fa-thumbs-up"></i></button>
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
  });
  picSection.append(rowOne, rowTwo);
};

const apiLikeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKeyInvolvment}/likes`;

const postLikes = (imgId) => {
  fetch(apiLikeUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: imgId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res);
};

const getLikes = async () => {
  const currItemLikes = await fetch(apiLikeUrl)
    .then((resp) => resp)
    .then((data) => data.json());
  return currItemLikes;
};

const likeBtns = document.getElementsByClassName('likes');

const showLikes = () => {
  getLikes().then((img) => {
    for (let i = 0; i < img.length; i += 1) {
      const currLikes = img[i].likes;
      likeBtns[i].innerHTML = `${currLikes} Likes`;
    }
  });
};

const likeAPic = () => {
  const sayLike = document.getElementsByClassName('up');
  getLikes().then((img) => {
    for (let i = 0; i < img.length; i += 1) {
      const currId = img[i].item_id;
      sayLike[i].addEventListener('click', () => {
        postLikes(currId);
      });
      showLikes();
    }
  });
};

export {
  displayPics, postLikes, showLikes, likeAPic,
};
