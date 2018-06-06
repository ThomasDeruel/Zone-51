 // interface
var ui = {
    container:document.querySelector('.text-container'),
    name:document.querySelector('.text-container-name'),
    text:document.querySelector('.text-container-tchat'),
    bg:document.querySelector('.bg'),
    button:document.querySelector('button'),
    pause:document.querySelector('#pause'),
    canvas:document.querySelector('#canvas'),
    menuBtn:document.querySelector('.btnmenu'),
    leave:document.querySelector('.leave'),
    choice:document.querySelector('#choice'),
    retry:document.querySelector('.retry'),
    characters:document.querySelector('.characters'),
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
      index:3,
      current:['prologue','chap1','La pièce tout au fond','La porte blindée','chap2','Le premier couloir','chap3','chap4','chap5','chap6']
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
var currentChoice = [];
var currentCharacters = [];
var currentMusique;
var currentAmbience;
var currentBg;
var poster = false;
var img = false;
var next = true;
var isPaused = false;
var time= 0;
var memoMusique;
var memoAmbience;
var fullText = false;
var triggerChapter = "";
var timerf = [];
var memo;
var hello;
var lamusique;
var lambience;
//var currentPage = book.prologue[localStorage.getItem('page')];

// si ca bug on reset l'indexPage(les spameur de f5 -_-)
///////////////////////////
///////////////////////////
// BEGIN


    chapterUpdate();
    trigger();
    textFluid();
    update();

    soundplay();

    if(isPaused === false){
      window.addEventListener('click', function(){
              general();
              trigger();
      });

      window.addEventListener('keyup', function (event) {
          if (event.which === 32) {
              general();
              trigger();
          }
      })
    }
    else{
      isPaused = false;
      chapterUpdate();
      trigger();
      textFluid();
    }


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
     /* if(typeof currentPage !=="undefined"){
        if(time === time*(currentPage.length-1)){
            clearInterval(timer);
            return;
        }
      }*/
    }

function timer(){
// on va parcourir tous les caracteres de notre indexPage et on va les afficher 1 par 1
    console.log(fullText);
    if(fullText === false){
      fullText = true;
      for(let i = 0; i < currentPage.length; i++){
          time = time + 20;
          let t =  setTimeout(function(){
                  ui.text.innerHTML= ui.text.innerHTML + currentPage[i] ;
                  if(i === currentPage.length-1){
                    fullText = false;
                  }
              }
              , time);
          timerf.push(t);
      }
    }
    else{
        for(let i=0; i<timerf.length;i++){
            clearTimeout(timerf[i]);
        }
        timerf=[];
      ui.text.textContent = currentPage;
      fullText = false;
    }
}

function nextPage(mypage){
    if(indexPage < (mypage.length)-1){
      if(fullText === false){
        if(next === false){
          indexPage = indexPage;
        }
        else
        {
          indexPage++;
          localStorage.setItem('page',parseInt(localStorage.getItem('page'))+1);
        }
        next = true;
        memoMusique= mypage[localStorage.getItem('page')].musique;
        memoAmbience= mypage[localStorage.getItem('page')].ambience;
        chapterUpdate();
        currentPage = mypage[localStorage.getItem('page')].text;
        currentName = mypage[localStorage.getItem('page')].name;
        currentBg = mypage[localStorage.getItem('page')].bg;
        currentMusique = mypage[localStorage.getItem('page')].musique;
        currentAmbience = mypage[localStorage.getItem('page')].ambience;
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
    currentAmbience = book.prologue[localStorage.getItem('page')].ambience;
    triggerChapter = book.prologue[localStorage.getItem('page')].goto;
    currentChoice = book.prologue[localStorage.getItem('page')].choice;
    currentCharacters = book.prologue[localStorage.getItem('page')].characters;
    currentChapter = book.prologue;

    break;
    case 'chap1':
    currentPage = book.chapitre1[localStorage.getItem('page')].text;
    currentName = book.chapitre1[localStorage.getItem('page')].name;
    currentBg = book.chapitre1[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre1[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre1[localStorage.getItem('page')].ambience;
    triggerChapter = book.chapitre1[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre1[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre1[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre1;
    break;

    case 'La pièce tout au fond':
    currentPage = book.chapitre1Choix1[localStorage.getItem('page')].text;
    currentName = book.chapitre1Choix1[localStorage.getItem('page')].name;
    currentBg = book.chapitre1Choix1[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre1Choix1[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre1Choix1[localStorage.getItem('page')].ambience;
    triggerChapter = book.chapitre1Choix1[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre1Choix1[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre1Choix1[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre1Choix1;
    break;

    case 'La porte blindée':
    currentPage = book.chapitre1Choix2[localStorage.getItem('page')].text;
    currentName = book.chapitre1Choix2[localStorage.getItem('page')].name;
    currentBg = book.chapitre1Choix2[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre1Choix2[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre1Choix2[localStorage.getItem('page')].ambience;
    triggerChapter = book.chapitre1Choix2[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre1Choix2[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre1Choix2[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre1Choix2;
    break;

    case 'chap2':
    currentPage = book.chapitre2[localStorage.getItem('page')].text;
    currentName = book.chapitre2[localStorage.getItem('page')].name;
    currentBg = book.chapitre2[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre2[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre2[localStorage.getItem('page')].ambience;
    triggerChapter = book.chapitre2[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre2[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre2[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre2;
    break;

    case 'Le premier couloir':
    currentPage = book.chapitre2Choix1[localStorage.getItem('page')].text;
    currentName = book.chapitre2Choix1[localStorage.getItem('page')].name;
    currentBg = book.chapitre2Choix1[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre2Choix1[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre2Choix1[localStorage.getItem('page')].ambience;
    triggerChapter = book.chapitre2Choix1[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre2Choix1[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre2Choix1[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre2Choix1;
    break;

    case 'chap3':
    currentPage = book.chapitre3[localStorage.getItem('page')].text;
    currentName = book.chapitre3[localStorage.getItem('page')].name;
    currentBg = book.chapitre3[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre3[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre3[localStorage.getItem('page')].ambience;
        triggerChapter = book.chapitre3[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre3[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre3[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre3;
    break;

    case 'chap4':
    currentPage = book.chapitre4[localStorage.getItem('page')].text;
    currentName = book.chapitre4[localStorage.getItem('page')].name;
    currentBg = book.chapitre4[localStorage.getItem('page')].bg;
    currentMusique = book.chapitre4[localStorage.getItem('page')].musique;
    currentAmbience = book.chapitre4[localStorage.getItem('page')].ambience;
        triggerChapter = book.chapitre4[localStorage.getItem('page')].goto;
    currentChoice = book.chapitre4[localStorage.getItem('page')].choice;
    currentCharacters = book.chapitre4[localStorage.getItem('page')].characters;
    currentChapter = book.chapitre4;
    break;
  }
}

function update(){


if(currentName === undefined || currentName === undefined || currentName === false){
  ui.name.textContent = "";
  }
  else{
    ui.name.textContent = currentName + ":";
  }
//////////////////////////
if(currentBg !==""){
  ui.bg.setAttribute('src',currentBg);
  }


//////////////////////////

//sound //
 if(currentMusique !== memoMusique || currentMusique !== undefined){
    ui.musique.audio.setAttribute('src',currentMusique);
    ui.musique.audio.currentTime = 0;
    ui.ambience.audio.load();
    ui.musique.audio.play();
  }

  if(currentAmbience !== memoAmbience || currentAmbience !== undefined){
    ui.ambience.audio.setAttribute('src',currentAmbience);
    ui.ambience.audio.currentTime = 0;
    ui.ambience.audio.load();
    ui.ambience.audio.play();
  }
// characters//
if(currentCharacters !== undefined){
  if(img === true){
    img = false;
    while(ui.characters.firstChild) {
      ui.characters.removeChild(ui.characters.firstChild);
    }
  }
  for (var i = 0; i < currentCharacters.length; i++) {
    if(currentCharacters[i] !== undefined){
      switch(i){
        case 0:
        var divImg = document.createElement("img");
        divImg.classList.add('characters-one');
        divImg.setAttribute('src',currentCharacters[i]);
        ui.characters.appendChild(divImg);
        img = true;
        break;
        case 1:
        var divImg = document.createElement("img");
        divImg.classList.add('characters-two');
        divImg.setAttribute('src',currentCharacters[i]);
        ui.characters.appendChild(divImg);
        img = true;
        break;
        case 2:
        var divImg = document.createElement("img");
        divImg.classList.add('characters-three');
        divImg.setAttribute('src',currentCharacters[i]);
        ui.characters.appendChild(divImg);
        img = true;
        break;
      }
    }
  }
}else{
    img = false;
    while(ui.characters.firstChild) {
      ui.characters.removeChild(ui.characters.firstChild);
    }
  }
}

function trigger(){
  switch(triggerChapter){

    case 'prologue':
    chapter.index = 0;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;

    case 'chap1':
    chapter.index = 1;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;

    case 'La pièce tout au fond':
    chapter.index = 2;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;

    case 'La porte blindée':
    chapter.index = 3;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;

    case 'chap2':
    chapter.index = 4;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;

    case 'Le premier couloir':
    chapter.index = 5;
    choiceUpdate();
    chapterUpdate();
    update();
    isPaused = false ;
    resetChoice();
    clearAll();
    textFluid();
    break;
  }
  if(currentChoice !== undefined){
    //si j'ai un choix le jeu est en pause
    isPaused = true ;
    resetChoice();
    // mes choix précédents sont effacés

    // j'ai un choix
    for (var i = 0; i < currentChoice.length; i++) {
      if(currentChoice[i] !== undefined){
        poster = true;
        var newDiv = document.createElement("div");
        newDiv.classList.add('choice-items');
        newDiv.textContent = currentChoice[i];
        choice.appendChild(newDiv);
      }
    }
    if(choice.childNodes !== undefined || choice.childNodes !== null){
      var arrayChoices = choice.childNodes;
      for (var i = 0; i < arrayChoices.length; i++) {
        arrayChoices[i].addEventListener('click',function(){
          const val = this.textContent;
          switch(val){
            case "chap1":
            chapter.index = 1;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;

            case "La pièce tout au fond":
             chapter.index = 2;
             choiceUpdate();
              chapterUpdate();
              update();
                  isPaused = false ;
                  next = false;
                  resetChoice();
                  break;
              case "La porte blindée":
                  chapter.index = 3;
                  choiceUpdate();
                  chapterUpdate();
                  update();
                  isPaused = false ;
                  next = false;
                  resetChoice();
                  break;

            case "chap2":
            chapter.index = 4;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;

            case 'Le premier couloir':
            chapter.index = 5;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;

            case "chap4":
            chapter.index = 6;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;

            case "chap5":
            chapter.index = 7;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;

            case "chap6":
            chapter.index = 8;
            choiceUpdate();
            chapterUpdate();
            update();
            isPaused = false ;
            next = false;
            resetChoice();
            break;
          }
        })
      }
    }
  }
  else{
    //reset si y a rien
    isPaused = false ;
    resetChoice();
  }
}
function resetChoice(){
  if(poster === true){
    poster = false;
    while (choice.firstChild) {
      choice.removeChild(choice.firstChild);
    }
  }
}
function choiceUpdate(){
  string_page = JSON.stringify(page);
  localStorage.setItem("page", string_page);
  localStorage.setItem("page", parseInt(0));

  string_chapter =  JSON.stringify(chapter);
  localStorage.setItem("chapter", string_chapter);

  indexPage = localStorage.getItem('page');
  indexChapter = chapter.index;
  memoChapter = chapter.current[chapter.index];

}
function resetsound(){
        ui.musique.audio.removeAttribute('src');
        ui.ambience.audio.removeAttribute('src');
    ui.musique.audio.load();
    ui.ambience.audio.load();
}

function soundplay(){
    for(var i = 0; i < indexPage; i++){
        if(currentChapter[i].musique !== undefined) {
            lamusique = currentChapter[i].musique;
        }
        ui.musique.audio.setAttribute('src', lamusique);
        ui.musique.audio.play();

        if(currentChapter[i].ambience !== undefined) {
            lambience = currentChapter[i].ambience;
        }
        ui.ambience.audio.setAttribute('src', lambience);
        ui.ambience.audio.play();
    }

}
