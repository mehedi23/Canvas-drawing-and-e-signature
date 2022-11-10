var signature_form = document.querySelector('.signature-form'); // parent element to maintain canvas width, it is optional

function drawing_canvas(canvas, drawing_board_clear, input_file) {
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    canvas.width = signature_form.clientWidth;
    canvas.height = 200;
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 1;

    var drawing = false;
    var mousePos = {
        x: 0,
        y: 0
    };
    var lastPos = mousePos;

    canvas.addEventListener("mousedown", function(e) {
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);

    canvas.addEventListener("mouseup", function(e) {
        drawing = false;
        getting_blob_data()
    }, false);

    canvas.addEventListener("mousemove", function(e) {
        mousePos = getMousePos(canvas, e);
    }, false);

    // Add touch event support for mobile
    canvas.addEventListener("touchstart", function(e) {

    }, false);

    canvas.addEventListener("touchmove", function(e) {
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchstart", function(e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchend", function(e) {
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
        getting_blob_data()
    }, false);

    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
        }
    }

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        }
    }

    function renderCanvas() {
        if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
        }
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function(e) {
        if (e.target == canvas) {
            $('body').css({
                'overflow-y' : 'hidden'
            })
        }
    }, false);

    document.body.addEventListener("touchend", function(e) {
        if (e.target == canvas) {
            $('body').css({
                'overflow-y' : 'auto'
            })
        }
    }, false);

    

    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    function clearCanvas() {
        canvas.width = canvas.width;
    }

    // Set up the UI
    
    drawing_board_clear.addEventListener("click", function(e) {
        clearCanvas();
    }, false);
    
    // var sigText = document.getElementById("sig-dataUrl");
    // var sigImage = document.getElementById("sig-image");
    // var submitBtn = document.getElementById("sig-submitBtn");
    // submitBtn.addEventListener("click", function(e) {
    //     var dataUrl = canvas.toDataURL();
    //     sigText.innerHTML = dataUrl;
    //     sigImage.setAttribute("src", dataUrl);
    // }, false);

    function getting_blob_data() {
        var dataUrl = canvas.toDataURL();
        console.log(dataUrl)
        // sigText.innerHTML = dataUrl;
        input_file.value = dataUrl
        // sigImage.setAttribute("src", dataUrl);
    }
};

var drawing_board = document.querySelectorAll('.board-name');
var drawing_board_clear = document.querySelectorAll('.board-clear-button');
var signature_img_input = document.querySelectorAll('.base-url-data');

for (let i = 0; i < drawing_board.length; i++) {
    if(drawing_board.length > 0){
        drawing_canvas(drawing_board[i], drawing_board_clear[i], signature_img_input[i])
    }
}
