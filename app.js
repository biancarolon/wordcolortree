const canvas = document.querySelector('canvas')
const generateInput= document.querySelector('.generate-tree-button')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let curve;
let wordString;
//function to convert input for leafs color
function stringToColour(str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  var colour = '#'

  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2)
  }

  return colour
}


function drawTree(startX,startY,len,angle,branchWidth,colorT,colorL){
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = colorT
    ctx.fillStyle = colorL
    
    ctx.shadowBlur = 10 //add a little blur to the design
    ctx.shadowColor = 'rgba(255,255,255,.5)'
    
    ctx.lineWidth = branchWidth
    //move our canvas along X and Y axes depending on the values we pass to it
    ctx.translate(startX, startY)
    ctx.rotate((angle*Math.PI)/180) //degrees into radians for canvas
    ctx.moveTo(0,0); //begins a new subpath
//    ctx.lineTo(0,-len); //set len to negative for the tree to go upwards

    if(angle>0){
        ctx.bezierCurveTo(10, -len/2, 50, -len/2, 0, -len);
    }else{
        ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len);
    }
    
    ctx.stroke();
    
    //create limit bc our computer has its range of limitations for rendering 
    //limit segments
    if(len<5){
        //leafs
        ctx.beginPath();
        ctx.arc(0,-len,20,0,Math.PI/2);
        ctx.fill();
        ctx.restore();
        return; //returns the most recent version
    }
    
    curve = Math.random() * 10 + 10
    
    drawTree(0,-len,len*0.75,angle+curve,branchWidth*0.5);
    //to make branches go on opposite directions
    drawTree(0,-len,len*0.75,angle-curve,branchWidth*0.5);
    ctx.restore(); //back to original position after all rotate ans translate process.
}

drawTree(canvas.width/2,canvas.height-95,120,0,1,'white','yellow');

function generateRndTree(word){
    ctx.clearRect(0,0,canvas.width,canvas.height);
//    startX,startY,len,angle,branchWidth,colorT,colorL
    let centerPointx = canvas.width/2; //for the horizontal axis
    let len = Math.floor(Math.random()*20+100);
    let angle = 0;
    let branchWidth = Math.floor(Math.random()*140+1);
    let colorT='white';
    let colorL=stringToColour(word);
    drawTree(canvas.width / 2,canvas.height - 80,len,angle,branchWidth,colorT,colorL)
}

generateInput.addEventListener('keyup', (e) => {
  console.log(e.target.value)
  wordString = e.target.value
  generateRndTree(wordString)
})

generateInput.insertAdjacentHTML('afterend', '<div id="generateTree">🪴</div>')

generateTreeButton = document.getElementById('generateTree')



