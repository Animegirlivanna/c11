Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img src="'+ data_uri +'" id="captured_image">';
    })
}

console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Suoi-f2aJ/model.json" ,modelLoaded);
function modelLoaded() {
    console.log("model loaded");
}
predicition_1 = "";
predicition_2 = "";
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + predicition_1;
    speak_data_2 = "The second prediction is " + predicition_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        predicition_1 = results[0].label;
        predicition_2 = results[1].label;
        
        document.getElementById("result_emotion_name").innerHTML = predicition_1;
        document.getElementById("result_emotion_name2").innerHTML = predicition_2;
        speak();

        if (predicition_1 == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if (predicition_1 == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if (predicition_1 == "amazing") {
            document.getElementById("update_emoji").innerHTML = "&#9994;";
        }



        if (predicition_2 == "Best") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }

        if (predicition_2 == "victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }

        if (predicition_2 == "amazing") {
            document.getElementById("update_emoji2").innerHTML = "&#9994;";
        }
    }
}