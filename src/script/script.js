 // interface
var ui = {
    container:document.querySelector('.text-container'),
    name:document.querySelector('.text-container-name'),
    text:document.querySelector('.text-container-tchat'),
    bg:document.querySelector('.bg'),
    button:document.querySelector('button'),
    music:document.querySelector('music'),
    ambient:document.querySelector('button'),
    pause:document.querySelector('#pause'),
    canvas:document.querySelector('#canvas'),
    menuBtn:document.querySelector('.btnmenu'),
    leave:document.querySelector('.leave'),
    musique: {
        range:document.querySelector('.musique-range'),
        val:document.querySelector('.musique-value'),
        audio:document.querySelector('.musique-audio')
    },
    ambience: {
        range:document.querySelector('.ambience-range'),
        val:document.querySelector('.ambience-value'),
        audio:document.querySelector('.ambience-audio')
    }
};

var page = localStorage.getItem('page');
  if (page === null) {
    page = [];
    var string_page = JSON.stringify(page);
    localStorage.setItem("page", string_page);
    localStorage.setItem("page", parseInt(0));
  } else {
    page = JSON.parse(page);
  }

var chapter = localStorage.getItem('chapter');
  if (chapter === null) {
    chapter = {
      index:0,
      current:['prologue','chap1','chap2','chap3']
    };
    var string_chapter = JSON.stringify(chapter);
    localStorage.setItem("chapter", string_chapter);
    } else {
    chapter = JSON.parse(chapter);
    }


var indexPage = localStorage.getItem('page');
var indexChapter = chapter.index;
var memoChapter = chapter.current[chapter.index];
var currentPage = "";
var currentName = "";
var currentChapter =[];
var isPaused = false;
var time= 0;
var memoMusique;
var fullText = false;
var triggerChapter = "";

//var currentPage = book.prologue[localStorage.getItem('page')];

// si ca bug on reset l'indexPage(les spameur de f5 -_-)
///////////////////////////
///////////////////////////
// BEGIN


    chapterUpdate();
    textFluid();
    window.addEventListener('click', function(){

            general();
            trigger();
    })

    window.addEventListener('keyup', function (event) {
        if (event.which === 32) {

            general();
            trigger();
        }
    })


/////////////////
////////////////
// functions //
function general(){
    if(isPaused === false){
     time=0;
     ui.text.textContent="";//text reset (for animation)

     clearAll();
     nextPage(currentChapter);
     textFluid();
    }
}
function textFluid(){
    update();
    if(currentPage === undefined || currentPage === undefined || currentPage === false || typeof currentPage === "undefined"){
      ui.text.textContent = "";
      return;
    }

    timer();
      if(typeof currentPage !=="undefined"){
        if(time === time*(currentPage.length-1)){
            clearInterval(timer);
            return;
        }
      }
    }

function timer(){
// on va parcourir tous les caracteres de notre indexPage et on va les afficher 1 par 1
    if(fullText === false){
      fullText = true;
      for(let i = 0; i < currentPage.length; i++){
          time = time + 20;
          var timer =  setTimeout(function(){
                  ui.text.innerHTML= ui.text.innerHTML + currentPage[i] ;
                  if(i === currentPage.length-1){
                    fullText = false;
                    return;
                  }
              }
              , time);
      }
    }
    else{
      ui.text.innerHTML = currentPage;
      fullText = false;
    }
}

function nextPage(mypage){
    if(indexPage < (mypage.length)-1){
      if(fullText === false){
        indexPage++;

        memoMusique= mypage[localStorage.getItem('page')].musique;
        chapterUpdate();
        localStorage.setItem('page',parseInt(localStorage.getItem('page'))+1);
        currentPage = mypage[localStorage.getItem('page')].text;
        currentName = mypage[localStorage.getItem('page')].name;
        currentBg = mypage[localStorage.getItem('page')].bg;
        currentMusique = mypage[localStorage.getItem('page')].musique;
        update();//update img/name/
      }
    }

}

function clearAll(){
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
    // interval +1

    for (var i = 1; i < interval_id; i++){
        window.clearInterval(i);
    }
}
function chapterUpdate(){

  switch(memoChapter){
    case 'prologue':
    currentPage = book.prologue[localStorage.getItem('page')].text;
    currentName = book.prologue[localStorage.getItem('page')].name;
    currentBg = book.prologue[localStorage.getItem('page')].bg;
    currentMusique = book.prologue[localStorage.getItem('page')].musique;
    triggerChapter = book.prologue[localStorage.getItem('page')].goto;
    currentChapter = book.prologue;

    break;
    case 'chap1':
    currentPage = book.chapitre1[localStorage.getItem('page')].text;
    currentName = book.chapitre1[localStorage.getItem('page')].name;
    currentBg = book.chapitre1[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre1[localStorage.getItem('page')].musique;
    triggerChapter = book.chapitre1[localStorage.getItem('page')].goto;
    currentChapter = book.chapitre1;
    break;
    case 'chap2':
    currentPage = book.chapitre2[localStorage.getItem('page')].text;
    currentName = book.chapitre2[localStorage.getItem('page')].name;
    currentBg = book.chapitre2[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre2[localStorage.getItem('page')].musique;
    currentChapter = book.chapitre2;
    break;
    case 'chap3':
    currentPage = book.chapitre3[localStorage.getItem('page')].text;
    currentName = book.chapitre3[localStorage.getItem('page')].name;
    currentBg = book.chapitre3[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre3[localStorage.getItem('page')].musique;
    currentChapter = book.chapitre3;
    break;
    case 'chap4':
    currentPage = book.chapitre4[localStorage.getItem('page')].text;
    currentName = book.chapitre4[localStorage.getItem('page')].name;
    currentBg = book.chapitre4[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre4[localStorage.getItem('page')].musique;
    currentChapter = book.chapitre4;
    break;
  };
}

function update(){


if(currentName === undefined || currentName === undefined || currentName === false){
  ui.name.textContent = "";
  }
  else{
    ui.name.textContent = currentName + ":";
  }
//////////////////////////
if(currentBg === undefined || currentBg === undefined || currentBg=== false){
  ui.bg.setAttribute('src','img/black.jpg');
  }
  else{
  ui.bg.setAttribute('src',currentBg);
  }

//////////////////////////
if(currentMusique !== memoMusique){
  ui.musique.audio.setAttribute('src',currentMusique);
  ui.musique.audio.currentTime = 0;
  ui.musique.audio.currentTime = 0;
  ui.musique.audio.play();
  }
  else{
    ui.musique.audio.getAttribute('src',currentMusique);
  }

}

function trigger(){
  switch(triggerChapter){
    case 'chap1':
    chapter.index = 1;

    string_page = JSON.stringify(page);
    localStorage.setItem("page", string_page);
    localStorage.setItem("page", parseInt(0));

    string_chapter =  JSON.stringify(chapter);
    localStorage.setItem("chapter", string_chapter);

    indexPage = localStorage.getItem('page');
    indexChapter = chapter.index;
    memoChapter = chapter.current[chapter.index];
    break;

    case 'chap2':
    chapter.index = 2;

    string_page = JSON.stringify(page);
    localStorage.setItem("page", string_page);
    localStorage.setItem("page", parseInt(0));

    string_chapter =  JSON.stringify(chapter);
    localStorage.setItem("chapter", string_chapter);

    indexPage = localStorage.getItem('page');
    indexChapter = chapter.index;
    memoChapter = chapter.current[chapter.index];
    break;

  }
}
