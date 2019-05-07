'use strict';

const likeButton = document.querySelector('.like_btn');

const updateLike = (e) => {
  e.preventDefault();
  axios.patch(`/explore/toggleLike/${e.target.dataset.imageid}`);

  if (document.getElementById('heart-icon').className === 'fas fa-heart') {
    document.getElementById('heart-icon').className = 'far fa-heart';
  } else {
    document.getElementById('heart-icon').className = 'fas fa-heart';
  }
};

likeButton.addEventListener('click', updateLike);
