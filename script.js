// interface
var ui = {
    container:document.querySelector('.text-container'),
    name:document.querySelector('.text-container-name'),
    text:document.querySelector('.text-container-tchat'),
    bg:document.querySelector('.bg'),
    button:document.querySelector('button'),
    music:document.querySelector('music'),
    ambient:document.querySelector('button'),
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
      index:1,
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
var currentChapter =[];

var book = {
  prologue : ['ceci est un test', "lol","hihi","XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD","noob",'tu es pathétique'],
  chapitre1 : ['ceci est un test2', "lol2","hihi2","XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD2","noob2",'tu es pathétique2'],
  chapitre2 : ['ceci est un test2', "lol2","hihi2","XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD2","noob2",'tu es pathétique2'],
  chapitre3 : ['ceci est un test2', "lol2","hihi2","XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD2","noob2",'tu es pathétique2']
};
chapterUpdate();
var time= 0;
console.log(currentChapter)
//var currentPage = book.prologue[localStorage.getItem('page')];

// si ca bug on reset l'indexPage(les spameur de f5 -_-)
///////////////////////////
///////////////////////////
// BEGIN
textFluid();
window.addEventListener('click',function(){
    ui.text.textContent="";
    time=0;
    clearAll();
    nextPage(currentChapter);
    textFluid();
})
window.addEventListener('keyup',function(event){
    if(event.which === 32){
        ui.text.textContent="";
        time=0;
        clearAll();
        nextPage(currentChapter);
        textFluid();
    }
    /*else if (event.which === 8){
        ui.text.textContent="";
        time=0;
        clearAll();
        previousPage();
        textFluid();
    }*/
})
/////////////////
////////////////
// functions //
function textFluid(){
    timer();
    if(typeof currentPage !== 'undefined'){
      if(time === time*(currentPage.length-1)){
          clearInterval(timer);
          return;
      }
    }
}

function timer(){
// on va parcourir tous les caracteres de notre indexPage et on va les afficher 1 par 1
    for(let i = 0; i < currentPage.length; i++){
        time = time + 20;
        var timer =  setTimeout(function(){
                ui.text.textContent = ui.text.textContent + currentPage[i] ;
            }
            , time);
    }
}
function nextPage(mypage){
    if(indexPage < (mypage.length)-1){
      indexPage++;
      chapterUpdate()
      localStorage.setItem('page',parseInt(localStorage.getItem('page'))+1);
      currentPage = mypage[localStorage.getItem('page')];
    }

}

function clearAll(){
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
    // interval +1
    for (var i = 1; i < interval_id; i++)
        window.clearInterval(i);
}
function chapterUpdate(){
  switch(memoChapter){
    case 'prologue':
    currentPage = book.prologue[localStorage.getItem('page')];
    currentChapter = book.prologue;

    break;
    case 'chap1':
    currentPage = book.chapitre1[localStorage.getItem('page')];
    currentChapter = book.chapitre1;
    break;
    case 'chap2':
    currentPage = book.chapitre2[localStorage.getItem('page')];
    currentChapter = book.chapitre2;
    break;
    case 'chap3':
    currentPage = book.chapitre3[localStorage.getItem('page')];
    currentChapter = book.chapitre3;
    break;
    case 'chap4':
    currentPage = book.chapitre4[localStorage.getItem('page')];
    currentChapter = book.chapitre4;
    break;
  };
}
