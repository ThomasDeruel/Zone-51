ui.menuBtn.addEventListener('click',function(){
    isPaused = true;
    console.log('isPaused');
    if(pause.className === "off"){
        ui.pause.className="on";
        ui.canvas.className="canvas";
        window.addEventListener('click',general)
    }
    else{

        ui.musique.val.textContent = ui.musique.range.textContent+'/100';
        ui.ambience.val.textContent = ui.ambience.range.textContent+'/100';
        ui.pause.className="off";
        ui.canvas.className="off";
    }
})
ui.leave.addEventListener('click', function(){
menu();
})
ui.musique.range.addEventListener('input',function(){
    ui.musique.val.textContent = ui.musique.range.value +'/100';
    ui.musique.audio.volume = (ui.musique.range.value/100);

})
ui.ambience.range.addEventListener('input',function(){
    ui.ambience.val.textContent = ui.ambience.range.value +'/100'
})
/*ui.retry.addEventListener('click',function(){
  reset();


})*/
function reset(){
  string_page = JSON.stringify(page);
  localStorage.setItem("page", string_page);
  localStorage.setItem("page", parseInt(0));

  chapter.index=0;
  string_chapter =  JSON.stringify(chapter);
  localStorage.setItem("chapter", string_chapter);


  indexPage = localStorage.getItem('page');
  indexChapter = chapter.index;
  memoChapter = chapter.current[chapter.index];

  isPaused = false ; //menu cancelled
  next = false; // nextpage cancelled
  choiceUpdate(); //update choice
  chapterUpdate(); // update choice
  update(); // update data
  menu(); //menu off
}
function menu(){
  if(currentChoice !== undefined){
    isPaused = true;
  }
  else{
    isPaused = false;
  }
  if(pause.className === "off"){
    ui.pause.className="on";
    ui.canvas.className="canvas";
  }
  else{
    ui.pause.className="off";
    ui.canvas.className="off";
  }
}
