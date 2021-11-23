import './style.css';
import CommentsPopUp from './comments';
const commentsModule = new CommentsPopUp();
const commentBtns = document.querySelectorAll('.commentBtn');
console.log(commentBtns);
if(commentBtns){
  commentBtns.forEach((btn) => {
    console.log(btn);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = btn.getAttribute('data');
      commentsModule.display(itemId);
    });
  });
}