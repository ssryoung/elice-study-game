let peopleNum = document.getElementsByClassName("people")[0].innerHTML;
let bumbNum = document.getElementsByClassName("bumb")[0].innerHTML;
let peopleMinus = document.getElementById("peopleMinus");
let peoplePlus = document.getElementById("peoplePlus");
let bumbMinus = document.getElementById("bumbMinus");
let bumbPlus = document.getElementById("bumbPlus");
let playbutton = document.getElementsByClassName("play_btn")[0];
let img = document.getElementsByClassName("lotImg");
let lotResult = document.getElementsByClassName("lotResult");
let ul = document.getElementsByClassName("lot_list")[0];



function ppMinus(){
  if(peopleNum > 1){
    peopleNum = parseInt(peopleNum)-1;
    document.getElementsByClassName("people")[0].innerHTML = peopleNum;

    let newPeople = document.getElementsByClassName("lot")[peopleNum];
    ul.removeChild(newPeople); 
  }
  else{
    window.alert("더 이상 내려갈 수 없습니다.");
  }
    
}
function ppPlus(){
  if(peopleNum<10){
    peopleNum=parseInt(peopleNum)+1;
    document.getElementsByClassName("people")[0].innerHTML=peopleNum;
                
    let newPeople = document.createElement('li');
    newPeople.setAttribute('class', 'lot');
	  let newImg = document.createElement('img');
    newImg.setAttribute('class','lotImg');
    let newdiv=document.createElement('div');
    newdiv.setAttribute('class','lotResult');
        
    newPeople.appendChild(newImg);
    newPeople.appendChild(newdiv);
    ul.appendChild(newPeople);
  }
  else{
    window.alert("더 이상 올라갈 수 없습니다.");
  }
}

function bbMinus(){
  if(bumbNum>1){
    bumbNum=parseInt(bumbNum)-1;
    document.getElementsByClassName("bumb")[0].innerHTML=bumbNum;
  }
  else{
    window.alert("더 이상 내려갈 수 없습니다.");
  }
    
}
function bbPlus(){
  if(bumbNum<10){
    bumbNum=parseInt(bumbNum)+1;
    document.getElementsByClassName("bumb")[0].innerHTML=bumbNum;
  }
  else{
    window.alert("더 이상 올라갈 수 없습니다.");
  }
}

function changeImg(){
  var arr=[];
  for(i=0; i<bumbNum;i++){
    a=Math.floor(Math.random()*peopleNum)
    while(arr.includes(a)){
      a=Math.floor(Math.random()*peopleNum)
    }
    arr.push(a);   
  }
  for(i=0; i<peopleNum;i++){
    if(arr.indexOf(i)>-1){
      img[i].className+=" bombImg";
      lotResult[i].innerHTML=`${i+1}번   당첨!`

    }
    else{
      img[i].className+=" passImg";
      lotResult[i].innerHTML=`${i+1}번   통과~`
    }
        
  }
}

peopleMinus.addEventListener("click",ppMinus);
peoplePlus.addEventListener("click",ppPlus);
bumbMinus.addEventListener("click",bbMinus);
bumbPlus.addEventListener("click",bbPlus);
playbutton.addEventListener("click",changeImg);

