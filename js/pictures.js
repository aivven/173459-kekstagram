'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var users = new Array(25);
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');

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

  for (var x = 0; x < users.length; x++) {
    users[x] = {
      url: 'photos/' + (x + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: addPhrase()
    };
  }
}

createUsers();


function createTemplate() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < users.length; i++) {
    var element = template.content.querySelector('.picture').cloneNode(true);
    element.querySelector('img').src = users[i].url;
    element.querySelector('.picture-likes').textContent = users[i].likes;
    element.querySelector('.picture-comments').textContent = users[i].comments;
    fragment.appendChild(element);
  }

  return fragment;
}

pictures.appendChild(createTemplate());

function hideFormFraming() {
  var upload = document.querySelector('.upload-overlay');
  upload.classList.add('hidden');
}

hideFormFraming();

function showGallery(n) {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryImage = gallery.querySelector('.gallery-overlay-image');
  var likesCount = gallery.querySelector('.likes-count');
  var commentsCount = gallery.querySelector('.comments-count');
  gallery.classList.remove('hidden');
  galleryImage.src = users[n].url;
  likesCount.textContent = users[n].likes;
  commentsCount.textContent = users[n].comments;
}

var popup = document.querySelector('.gallery-overlay');
var popupOpen = document.querySelectorAll('.picture')[1];
var popupClose = document.querySelector('.gallery-overlay-close');

var closePopup = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

popupClose.addEventListener('click', closePopup);

popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var openPopup = function () {
  showGallery(1);
};

popupOpen.addEventListener('click', openPopup);
