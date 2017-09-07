'use strict';

var STEP = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var users = new Array(25);
var picturesBlock = document.querySelector('.pictures');
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

picturesBlock.appendChild(createTemplate());

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

function addHandlersToPicturesElements() {
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
}

addHandlersToPicturesElements();

var uploadSelectImage = document.querySelector('#upload-select-image');

var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
var uploadFileElem = uploadSelectImage.querySelector('#upload-file');
var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');

function onUploadFile() {
  uploadSelectImage.querySelector('.upload-image').classList.add('hidden');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
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
  uploadSelectImage.querySelector('.upload-image').classList.remove('hidden');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
}

uploadFileElem.addEventListener('change', onUploadFile);
uploadFormCancel.addEventListener('click', onCloseUploadOverlay);
uploadFormCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onCloseUploadOverlay();
  }
});

function addResizeControlsLogic() {
  var uploadResizeControlsValue = uploadSelectImage.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtons = uploadSelectImage.querySelectorAll('.upload-resize-controls-button');
  for (var i = 0; i < uploadResizeControlsButtons.length; i++) {
    uploadResizeControlsButtons[i].addEventListener('click', function (event) {
      var step = event.target.classList.contains('upload-resize-controls-button-inc') ? STEP : -STEP;
      var currentSize = parseInt(uploadResizeControlsValue.value, 10);
      var newSize = currentSize + step;
      if (newSize <= 100 && newSize >= 25) {
        uploadResizeControlsValue.value = newSize + '%';
        effectImagePreview.style = 'transform: scale(' + newSize / 100 + ')';
      }
    });
  }
}

addResizeControlsLogic();

var uploadFormDescription = uploadSelectImage.querySelector('.upload-form-description');

uploadFormDescription.addEventListener('invalid', function () {
  if (!uploadFormDescription.validity.valid) {
    if (uploadFormDescription.value.length < 30) {
      uploadFormDescription.setCustomValidity('Комментарий должен содержать не менее 30 символов');
      uploadFormDescription.style.border = '1px solid red';
    } else if (uploadFormDescription.value.length > 100) {
      uploadFormDescription.setCustomValidity('Комментарий должен содержать не более 100 символов');
      uploadFormDescription.style.border = '1px solid red';
    } else if (uploadFormDescription.validity.valueMissing) {
      uploadFormDescription.setCustomValidity('Обязательное поле');
      uploadFormDescription.style.border = '1px solid red';
    }
  } else {
    uploadFormDescription.setCustomValidity('');
    uploadFormDescription.style.border = 'none';
  }
});

uploadFormDescription.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Комментарий должен содержать не менее 30 символов');
    uploadFormDescription.style.border = '1px solid red';
  } else {
    target.setCustomValidity('');
    target.style.border = 'none';
  }
});

function onChangeFilterEffects(evt) {
  var target = evt.target;

  if (target.tagName === 'INPUT') {
    effectImagePreview.style.filter = '';
    effectImagePreview.className = 'effect-image-preview';
    effectImagePreview.classList.add(target.id.replace('upload-', ''));
    if (effectImagePreview.classList.contains('effect-none')) {
      uploadOverlay.querySelector('.upload-effect-level').style.display = 'none';
    } else {
      uploadOverlay.querySelector('.upload-effect-level').style.display = '';
    }
  } else {
    return;
  }
}

uploadOverlay.querySelector('.upload-effect-controls').addEventListener('click', onChangeFilterEffects);

var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');

function onValidHashtags() {

  var target = event.target;
  var arrayHashtags = target.value.split(' ');
  if (arrayHashtags.length > 5) {
    target.setCustomValidity('В строке указано больше 5 хэштэгов');
    target.style.border = 'red solid 1px';
  } else {
    for (var index = 0; index < arrayHashtags.length; index++) {
      arrayHashtags.sort();
      if (arrayHashtags[index].length > 20) {
        target.setCustomValidity('Хэштэг не может содержать более 20 символов');
        target.style.border = 'red solid 1px';
        break;
      } else if (arrayHashtags[index].charAt(0) !== '#') {
        target.setCustomValidity('Хэштэг должен начинаться с символа "#"');
        target.style.border = 'red solid 1px';
        break;
      } else if (arrayHashtags[index].lastIndexOf('#') > 0) {
        target.setCustomValidity('Хэштэги должны разделяться пробелом');
        target.style.border = 'red solid 1px';
        break;
      } else if ((index !== arrayHashtags.length - 1) && (arrayHashtags[index + 1] === arrayHashtags[index])) {
        target.setCustomValidity('В строке указаны повторяющиеся хэштэги');
        target.style.border = 'red solid 1px';
        break;
      } else {
        target.setCustomValidity('');
        target.style.border = 'none';
      }
    }
  }
}

uploadFormHashtags.addEventListener('change', onValidHashtags);

var uploadEffectLevelPin = uploadOverlay.querySelector('.upload-effect-level-pin');
var uploadEffectLevelVal = uploadOverlay.querySelector('.upload-effect-level-val');

uploadEffectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var MIN_COORD = 8;
  var MAX_COORD = 446;
  var sliderCoord;

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    if (uploadEffectLevelPin.offsetLeft - shiftX <= MIN_COORD) {
      sliderCoord = MIN_COORD;
    } else if (uploadEffectLevelPin.offsetLeft - shiftX >= MAX_COORD) {
      sliderCoord = MAX_COORD;
    } else {
      sliderCoord = uploadEffectLevelPin.offsetLeft - shiftX;
    }

    uploadEffectLevelPin.style.left = sliderCoord + 'px';
    var valPercent = Math.floor(sliderCoord / (MAX_COORD / 100));
    uploadEffectLevelVal.style.width = valPercent > 100 ? 100 + '%' : valPercent + '%';

    onMousedownChangeFilter(valPercent);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function onMousedownChangeFilter(value) {
  if (effectImagePreview.classList.contains('effect-chrome')) {
    effectImagePreview.style.filter = 'grayscale(' + (value / 100) + ')';
  } else if (effectImagePreview.classList.contains('effect-sepia')) {
    effectImagePreview.style.filter = 'sepia(' + value / 100 + ')';
  } else if (effectImagePreview.classList.contains('effect-marvin')) {
    effectImagePreview.style.filter = 'invert(' + value + '%)';
  } else if (effectImagePreview.classList.contains('effect-phobos')) {
    effectImagePreview.style.filter = 'blur(' + (3 / (100 / value)) + 'px)';
  } else if (effectImagePreview.classList.contains('effect-heat')) {
    effectImagePreview.style.filter = 'brightness(' + (3 / (100 / value)) + ')';
  }
}
