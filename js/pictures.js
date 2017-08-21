'use strict';

var users = new Array(25);
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture-template').content.querySelector('.picture');

function createUsers() {
  function getRandomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    random = Math.round(rand);
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
  };

  for (x = 0; x <= users.length; x++) {
    users[x] = {
      url: 'photos/' + (x + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: function addPhrase()
    };
  };
};

function createTemplate() {
  for (var i = 0; i <= users.length; i++) {
    var element = template.cloneNode(true);
    element.children[0].src = users[i].url;
    element.querySelector('.picture-likes').textContent = users[i].likes;
    element.querySelector('.picture-comments').textContent = users[i].comments;
    pictures.appendChild(element);
  };

};

function showPictures() {
  var fragment = document.createDocumentFragment();

  function createTemplate()

  pictures.appendChild(fragment);
};

function hideFormFraming() {
  var upload = document.querySelector('upload-overlay');
  upload.classList.add('hidden');
};

function hideFormFraming();

function showGallery() {
  var gallery = document.querySelector('gallery-overlay');
  gallery.classList.remove('hidden');
  galleryImage = gallery.querySelector('.gallery-overlay-image');
  galleryImage.src = users[0].url;
  likesCount = gallery.querySelector('.likes-count');
  likesCount.textContent = users[0].likes;
  commentsCount = gallery.querySelector('.comments-count');
  commentsCount.textContent = users[0].comments;
};

function showGallery();
