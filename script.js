let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d' ,{ willReadFrequently: true });
let delBtn= document.querySelector("button")
canvas.width = window.innerWidth *0.8;
canvas.height = window.innerHeight * 0.8;

let bgColor = "white";
let circles=[];
let circleCount=0;
let color;
let draggingDraw;	


delBtn.addEventListener("click", ()=>{
    context.fillStyle= bgColor;
    context.clearRect(0,0, canvas.width,  canvas.height);
});
	

window.addEventListener('load', start, false);
   function start()
	{
		canvas.addEventListener('mousedown', dragStart, false);
		canvas.addEventListener('mousemove', drag, false);
		canvas.addEventListener('mouseup', dragStop, false);
		canvas.addEventListener('dblclick', deleteCircle,false);
        // canvas.addEventListener('click', displayMsg, false);
	}	

    function getImage() {
      canvasImage= context.getImageData(0, 0, canvas.width, canvas.height);
    }
    
    function putImage() {
        context.putImageData(canvasImage, 0, 0);
    }

    function dragStart(event) {
        draggingDraw = true;
        dragStartLocation = getCircleCoordinates(event);
         color = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) +")";
        getImage();
    }
    
    function drag(event) {
        
        if (draggingDraw === true) {
            putImage();
            let position = getCircleCoordinates(event);
            drawCircle(position);
            context.fillStyle = color;
            context.fill();
        }
    }
    function dragStop(event) {
        draggingDraw = false;
        putImage();
        let position = getCircleCoordinates(event);
        drawCircle(position);		
        context.fill();	
        circleCount=circleCount+1;
        tempCircle = {x:tempX, y:tempY, rad:radius, color:color};
        
        circles.push(tempCircle);
        
    }
        
    function getCircleCoordinates(event) {
    
         x = event.clientX - canvas.getBoundingClientRect().left,
            y = event.clientY - canvas.getBoundingClientRect().top;
    
        return {x: x, y: y};
    }
    
   
    
    function drawCircle(position) {
        
           tempX=dragStartLocation.x;
           tempY=dragStartLocation.y;
            
             radius = Math.sqrt(Math.pow((tempX - position.x), 2) + Math.pow((tempY - position.y), 2));
            context.beginPath();
            context.arc(tempX, tempY, radius, 0, 2 * Math.PI, false);
            context.closePath();
    }
    function drawCircles() {
	  
		
		context.fillStyle = bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);		
		
		for (let i=0; i < circleCount; i++) {
			let radius = circles[i].rad;
			let x = circles[i].x;
			let y = circles[i].y;
			let color=circles[i].color;
			context.beginPath();
			context.arc(x, y, radius, 0, 2*Math.PI, false);
			context.closePath();
			context.fillStyle = color;
			context.fill();
		}		
    }


    function isCircleClicked(shape,x,y) {		
		let dx = x - shape.x;
		let dy = y - shape.y;
		return (dx*dx + dy*dy < shape.rad*shape.rad);
	}

//     function displayMsg(event) 
// {
// 		var i;
// 		var c=-1;
//         let bRect = canvas.getBoundingClientRect();
// 		mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
// 		mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
// 		//To find that which circle has been clicked
// 		for (i=0; i < circleCount; i++) {
// 			if	(isCircleClicked(circles[i], mouseX, mouseY)) {
// 				c = i;		
// 			}
// 		}
// 		if ( c > -1 ){
// 			alert('Hit');
// 			circleCount=circleCount-1;
// 		} 
						
// 	else{alert('Miss');}
//     }
    

    

    function deleteCircle(event) 
{
		let bRect = canvas.getBoundingClientRect();
		let mX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
		let mY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
		
		for ( let i=0; i < circleCount; i++) {
			if	(isCircleClicked(circles[i], mX, mY)) {
				dragIndexDelete = i;		
			}
		}
		
		if ( dragIndexDelete> -1 ){
			circles.splice(dragIndexDelete,1)[0];
			circleCount=circleCount-1;
		}
		
		
		drawCircles();		
		
}
