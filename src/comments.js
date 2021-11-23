export default class CommentsPopUp {
  constructor (){
    this.popUp = document.querySelector('.popup-container');
    this.sourceAPI = 'https://picsum.photos/id/';
  }
  display(id){
    if(id){
      this.popUp.style.display = 'block';
      this.popUp.innerHTML = 'Fetching Data...';
      this.fetchData(id).then((data) => {
        if(!Array.isArray(data)){
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
                <h3>Comments(<span>2</span>)</h3>
                <ul class="comment-lists">
                  <li>03/11/2021 Alex : How can I get it?</li>
                  <li>12/11/2021 Alex : I'm interested, discount?</li>
                </ul>
                <form action="#" id="form-data">
                  <input type="text" placeholder="Your name">
                  <textarea name="message" id="comment-msg" cols="30" rows="10" placeholder="Your comment"></textarea>
                  <input type="submit" name="submit" value="Comment" id="comment-btn">
                </form>
              </div>
            </div>
          </section>
          `;
          this.enableCloseBtn();
        } else {
          this.popUp.style.display = 'none';
        }
      });
    }
  }
  fetchData = async (id) => {
    let res;
    if(id){
      res = await fetch(`${this.sourceAPI}${id}/info`)
      .then((res) => res.json())
      .then((data) => data)
      .catch(() => []);
    }else{
      res = [];
    }
    return res; 
  }
  enableCloseBtn() {
    this.popUp.querySelector('.close-comments').addEventListener('click', () => {
      this.popUp.innerHTML = '';
      this.popUp.style.display = 'none';
    });
  };
}