
const likeButton = document.querySelector('.like_btn');

function updateLike (e) {
  e.preventDefault();
  console.log('data from like button', e.target.dataset.imageid);

  axios.patch(`/explore/toggleLike/${e.target.dataset.imageid}`);

  if (document.getElementById('heart-icon').className === 'fas fa-heart') {
    document.getElementById('heart-icon').className = 'far fa-heart';
  } else {
    document.getElementById('heart-icon').className = 'fas fa-heart';
  }
}

likeButton.addEventListener('click', updateLike);
