export default function(){
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
/////////////////////////
if(currentPage === undefined || currentPage === undefined || currentPage === false){
  ui.text.textContent = "";
  }
//////////////////////////
if(currentAmbience !== MemoSound){
  ui.bg.setAttribute('src','img/black.jpg');
  }
  else{
  ui.bg.setAttribute('src',currentBg);
  }
}
