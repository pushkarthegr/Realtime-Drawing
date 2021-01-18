difference = 0;
noseX = 0;
noseY = 0;

function preload(){

}
function setup(){
    canvas = createCanvas(530,400);
    canvas.position(725,250);

    video = createCapture(VIDEO);
    video.size(530,400);
    video.position(100,250);
    
    poseNets = ml5.poseNet(video,loaded);
    poseNets.on('pose',results);
}
function results(result){
    console.log(result);
    if(result.length>0){
        noseX = result[0].pose.nose.x;
        noseY = result[0].pose.nose.y;

        leftX = result[0].pose.leftWrist.x;
        rightX = result[0].pose.rightWrist.x;

        difference = Math.round(leftX - rightX);
    }
}
function loaded(){
    console.log("pose net loaded!!");
}
function draw(){
    value = document.getElementById("drop").value;
    background("#000000");

    fill("#ffffff");
    stroke("#ffffff");

    document.getElementById("distance").innerHTML = "The size of the shape is "+difference+"px";
    if(value == "Square"){
        rect(noseX,noseY,difference,difference);
    }else if(value == "Circle"){
        circle(noseX,noseY,difference);
    }else if(value == "Rectangle"){
        rectHeight = difference/2;
        rect(noseX,noseY,difference,rectHeight);
    }else if(value == "Triangle"){
        x1 = noseX - difference;
        x3 = noseX + difference;
        y = noseY + difference;
        triangle(x1,y,noseX,noseY,x3,y);
    }else{
        translate(noseX,noseY);
        noStroke();
        for (let i = 0; i < 10; i ++) {
            ellipse(0, 30, 20, difference);
            rotate(PI/5);
        }
    }
}