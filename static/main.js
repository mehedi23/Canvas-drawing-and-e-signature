const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('side-bar');
const submitBtn  = document.getElementById('get-url');
const sigText = document.getElementById('set-url');


const ctx = canvas.getContext('2d');


const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;



let isPaining = false;
let lineWidth = 5;
let startX;
let startY;


toolbar.addEventListener('click', e => {
    if(e.target.id === 'clear'){
        ctx.clearRect(0,0, canvas.width, canvas.height)
    };
});


toolbar.addEventListener('click', e => {
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
    };
    
    if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value;
    };
});




// for desktop

canvas.addEventListener('mousedown', e => {
    isPaining = true; // start painting

    // start point (x,y)
    startX = e.clientX;
    startX = e.clientY
});

canvas.addEventListener('mouseup', e => {
    isPaining = false; // end painting
    ctx.stroke(); // line color !!!
    ctx.beginPath(); // ending line continuity
});

canvas.addEventListener('mousemove', draw);


function draw(e){
    if(!isPaining) return;

    ctx.lineWidth = lineWidth; // line width
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY); // droing line
    ctx.stroke()

    // "e.clientX - canvasOffsetX" because in this project and as a gobal function "e" is targeting to the clint window. we can fix it only in the canvas area. "e.clientY" in this project this is getting the full heigt. so we no need to calculate it.
};









// for touch device

canvas.addEventListener('touchstart', e => {

    isPaining = true; // start painting

    // start point (x,y)
    startX = e.touches[0].clientX;
    startX = e.touches[0].clientY
});

canvas.addEventListener('touchend', e => {
    isPaining = false; // end painting
    ctx.stroke(); // line color !!!
    ctx.beginPath(); // ending line continuity
});

canvas.addEventListener('touchmove', draw_2);


function draw_2(e){
    if(!isPaining) return;

    ctx.lineWidth = lineWidth; // line width
    ctx.lineCap = 'round';

    ctx.lineTo(e.touches[0].clientX - canvasOffsetX, e.touches[0].clientY); // droing line
    ctx.stroke();

    // "e.clientX - canvasOffsetX" because in this project and as a gobal function "e" is targeting to the clint window. we can fix it only in the canvas area. "e.clientY" in this project this is getting the full heigt. so we no need to calculate it.
};







// get blob data
submitBtn.addEventListener("click", function() {
    var dataUrl = canvas.toDataURL();
    sigText.setAttribute("src", dataUrl);
});