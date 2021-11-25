export default class CommentsPopUp {
  constructor() {
    this.popUp = document.querySelector('.popup-container');
    this.sourceAPI = 'https://picsum.photos/id/';
    this.commentsAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/6EFdWvF7FBGr1SlmUqpP/'
  }

  display(id) {
    if (id) {
      this.popUp.style.display = 'block';
      this.popUp.innerHTML = 'Fetching Data...';
      this.fetchData(id).then((data) => {
        if (!Array.isArray(data)) {
          this.popUp.innerHTML = `
            <section class="comment-container transparent-background">
            <div class="section-wrapper center-block">
              <div class="block-one">
                <img class="main-img" src="${data.download_url}" alt="nature">
                <img class="sub-img close-comments" src="https://img.icons8.com/ios/75/000000/close-window.png" alt="close">
              </div>
              <div class="project-title">
                <h2>${data.author}</h2>
              </div>
              <div class="project-details">
                <div class="details-left">
                  <p><a href="${data.download_url}" target="_blank">Download</a></p>
                  <p>Price: $${data.id}.00</p>
                </div>
                <div class="details-right">
                  <p>Height: ${data.height} cm</p>
                  <p>Width: ${data.width} cm</p>
                </div>
              </div>
              <div class="comment-details">
                <h3>Comments(<span>(<span>0</span>)</span>)</h3>
                <ul class="comment-lists">
                </ul>
                <form action="#" id="form-data" class="comment-form" method="post" item_id='${data.id}'>
                  <input type="text" name="username" placeholder="Your name" required>
                  <textarea name="comment" id="comment-msg" cols="30" rows="10" placeholder="Your comment" required></textarea>
                  <input type="submit" name="submit" value="Comment" id="comment-btn">
                </form>
              </div>
            </div>
          </section>
          `;
          this.enableCloseBtn();
          this.enableComment();
          this.showComments(data.id);
        } else {
          this.popUp.style.display = 'none';
          this.popUp.innerHTML = '';
        }
      });
    }
  }

  fetchData = async (id) => {
    let res;
    if (id) {
      res = await fetch(`${this.sourceAPI}${id}/info`)
        .then((res) => res.json())
        .then((data) => data)
        .catch(() => []);
    } else {
      res = [];
    }
    return res;
  }

  enableCloseBtn() {
    this.popUp.querySelector('.close-comments').addEventListener('click', () => {
      this.popUp.innerHTML = '';
      this.popUp.style.display = 'none';
    });
  }

  enableComment() {
    const form = this.popUp.querySelector('form.comment-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = form.getAttribute('item_id');
      const comment = form.elements.comment.value;
      const username = form.elements.username.value;
      this.add(id, username, comment).then((res) => {
        if(res !== 'error'){
          form.reset();
          this.showComments(id);
        }
      })
    });
  }
  
  add = async(item_id, username, comment) => {
    const res = await fetch(`${this.commentsAPI}comments`, {
      method: 'POST',
      body: JSON.stringify({
        item_id, username, comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.text())
    .then((data) => data)
    .catch(() => 'error');
    return res;
  }

  showComments = async(item_id) => {
    const commentsList = this.popUp.querySelector('.comment-lists');
    const res = await fetch(`${this.commentsAPI}comments?item_id=${item_id}`)
    .then((res) => res.json())
    .then((data) => {
      if(!data.error){
        commentsList.innerHTML = '';
        data.forEach((info) => {
          commentsList.innerHTML += `<li>${info.creation_date} ${info.username} : ${info.comment}</li>`;
        });
        return data;
      }else{
        commentsList.innerHTML = '<b>No Comments have been added yet. Be the first to write something</b>'; 
      }
      
    })
    .catch(() => 'error');
    return res;
  }
}