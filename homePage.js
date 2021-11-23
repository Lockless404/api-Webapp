const getImages = async () => {
  const picIds = [1000, 1002, 1003, 1015, 1021, 1022];
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
  getImages().then((v)=>{
    v.forEach((img)=>{
      const listItem = document.createElement('div');
      listItem.innerHTML = `<div class='f-col'>
        <img src='${v[idx].download_url}' alt=''>
        <div class='f-row'>
          <p>Exhibition ${idx}</p>
          <p>5 Likes</p>
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

const postLikes = async (imgId) => {
  await fetch ()
}

export default getPics;
