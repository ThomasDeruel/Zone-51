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
})
ui.musique.range.addEventListener('input',function(){
    ui.musique.val.textContent = ui.musique.range.value +'/100';
    ui.musique.audio.volume = (ui.musique.range.value/100);

})
ui.ambience.range.addEventListener('input',function(){
    ui.ambience.val.textContent = ui.ambience.range.value +'/100'
})
