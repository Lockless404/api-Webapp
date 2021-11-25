import './style.css';
import { displayPics, showLikes, likeAPic } from './homePage.js';
import CommentsPopUp from './comments';

const commentsModule = new CommentsPopUp();
document.addEventListener('DOMContentLoaded', () => {
  displayPics().then(() => {
    showLikes();
    likeAPic();
    const commentBtns = document.querySelectorAll('.commentBtn');
    if (commentBtns) {
      commentBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const itemId = btn.getAttribute('data');
          commentsModule.display(itemId);
        });
      });
    }
  });
});
