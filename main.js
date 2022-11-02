objects=[];
status1="";
video="";

function setup()
{
      canvas=createCanvas(480, 350);
    canvas.center();
}

function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 350);
    if(status1 != "")
    {
        objectDetector.detect(video,gotResults);
        for(i=0; i < objects.length; i++)
        document.getElementById("status").innerHTML = "Status = Detected Objects"
        document.getElementById("count").innerHTML = "Number of Objects Detected = " + objects.length;

        fill("#CF0A0A");
        percent=objects[i].confidence*100;
        text(objects[i].label + percent + "%", objects[i].x +15, objects[i].y + 15);
        nofill();
        stroke("#CF0A0A");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}

function start()
{
   objectDetector = ml5.objectDetector("cocossd", ModalLoaded);
   document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects=results;
}

function ModalLoaded(status)
{
    console.log("Modal Loaded");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}