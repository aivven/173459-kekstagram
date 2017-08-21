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
      'Âñ¸ îòëè÷íî!',
      'Â öåëîì âñ¸ íåïëîõî. Íî íå âñ¸.',
      'Êîãäà âû äåëàåòå ôîòîãðàôèþ, õîðîøî áû óáèðàòü ïàëåö èç êàäðà. Â êîíöå êîíöîâ ýòî ïðîñòî íåïðîôåññèîíàëüíî.',
      'Ìîÿ áàáóøêà ñëó÷àéíî ÷èõíóëà ñ ôîòîàïïàðàòîì â ðóêàõ è ó íå¸ ïîëó÷èëàñü ôîòîãðàôèÿ ëó÷øå.',
      'ß ïîñêîëüçíóëñÿ íà áàíàíîâîé êîæóðå è óðîíèë ôîòîàïïàðàò íà êîòà è ó ìåíÿ ïîëó÷èëàñü ôîòîãðàôèÿ ëó÷øå.',
      'Ëèöà ó ëþäåé íà ôîòêå ïåðåêîøåíû, êàê áóäòî èõ èçáèâàþò. Êàê ìîæíî áûëî ïîéìàòü òàêîé íåóäà÷íûé ìîìåíò?!'
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
