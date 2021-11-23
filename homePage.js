const getPics = async () => {
  const picSection = document.getElementById('item-list');
  const rowOne = document.createElement('div');
  const rowTwo = document.createElement('div');
  rowOne.setAttribute('class', 'f-row');
  rowTwo.setAttribute('class', 'f-row');
  const picIds = [1000, 1002, 1003, 1015, 1021, 1022];
  const allPics = [];
  for(let i = 0; i < picIds.length + 1; i++) {
    const pic = await fetch(`https://picsum.photos/id/${picIds[i]}/info`);
    pic.json().then((img) => {
      allPics.push(img);
    })
  };
  let idx = 0;
  for(const item in allPics) {
    console.log(allPics)
    console.log(allPics[item].url)
    const listItem = document.createElement('div');
    listItem.innerHTML = `<div class='f-col'>
      <img src='${allPics[item].download_url}' alt=''>
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
  }
  picSection.append(rowOne, rowTwo);
  return JSON.stringify(allPics);
}

export default getPics;
