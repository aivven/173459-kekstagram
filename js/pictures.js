'use strict';

var users = new Array(25);
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture-template').content.querySelector('.picture');

function createUsers() {
  function getRandomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    var random = Math.round(rand);
    return random;
  }

  function addPhrase() {
    var phrases = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    var rand = Math.floor(Math.random() * phrases.length);
    return phrases[rand];
  }

  for (var x = 0; x <= users.length; x++) {
    users[x] = {
      url: 'photos/' + (x + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: addPhrase()
    };
  }
}

createUsers();

function createTemplate() {
  for (var i = 0; i <= users.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').src = users[i].url;
    element.querySelector('.picture-likes').textContent = users[i].likes;
    element.querySelector('.picture-comments').textContent = users[i].comments;
    pictures.appendChild(element);
  }
}

function showPictures() {
  var fragment = createTemplate();
  pictures.appendChild(fragment);
}

showPictures();

function hideFormFraming() {
  var upload = document.querySelector('upload-overlay');
  upload.classList.add('hidden');
}

hideFormFraming();

function showGallery() {
  var gallery = document.querySelector('gallery-overlay');
  gallery.classList.remove('hidden');
  var galleryImage = gallery.querySelector('.gallery-overlay-image');
  galleryImage.src = users[0].url;
  var likesCount = gallery.querySelector('.likes-count');
  likesCount.textContent = users[0].likes;
  var commentsCount = gallery.querySelector('.comments-count');
  commentsCount.textContent = users[0].comments;
}

showGallery();
