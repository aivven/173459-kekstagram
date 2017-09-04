'use strict';

var STEP = 25;
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
var picturesPreview = document.querySelectorAll('.picture');
var popupClose = document.querySelector('.gallery-overlay-close');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

popupClose.addEventListener('click', closePopup);

function generate(i) {
  return function (e) {
    e.preventDefault();
    showGallery(i);
  };
}

for (var i = 0; i < picturesPreview.length; i++) {
  var currentHandler = generate(i);
  picturesPreview[i].addEventListener('click', currentHandler);
}

var uploadSselectImage = document.querySelector('#upload-select-image');
var uploadFormCancel = uploadSselectImage.querySelector('.upload-form-cancel');
var uploadFile = uploadSselectImage.querySelector('#upload-file');
var uploadOverlay = uploadSselectImage.querySelector('.upload-overlay');
var uploadResizeControlsValue = uploadSselectImage.querySelector('.upload-resize-controls-value');
var uploadResizeControlsButtons = uploadSselectImage.querySelectorAll('.upload-resize-controls-button');
var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');

function onUploadFile() {
  uploadSselectImage.querySelector('.upload-image').classList.add('hidden');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
  uploadOverlay.querySelector('.upload-effect-level').style.display = 'none';
}

function onUploadOverlayEscPress(evt) {
  if (document.activeElement.classList.contains('upload-form-description')) {
    return;
  }
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseUploadOverlay();
  }
}

function onCloseUploadOverlay() {
  uploadSselectImage.querySelector('.upload-image').classList.remove('hidden');
  uploadOverlay.classList.add('hidden');
}

uploadFile.addEventListener('change', onUploadFile);
uploadFormCancel.addEventListener('click', onCloseUploadOverlay);
uploadFormCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onCloseUploadOverlay();
  }
});

for (var s = 0; s < uploadResizeControlsButtons.length; s++) {
  uploadResizeControlsButtons[s].addEventListener('click', function (event) {
    var step = event.target.classList.contains('upload-resize-controls-button-inc') ? STEP : -STEP;
    var valueFile = parseInt(uploadResizeControlsValue.value.substring(0, uploadResizeControlsValue.value.length - 1), 10);
    var newSize = valueFile + step;
    if (newSize <= 100 && newSize >= 25) {
      uploadResizeControlsValue.value = newSize + '%';
      effectImagePreview.style = 'transform: scale(' + newSize / 100 + ')';
    }
  });
}
