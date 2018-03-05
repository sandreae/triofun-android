var initRecorder

// Hides mobile browser's address bar when page is done loading.
window.addEventListener('load', function(e) {
  setTimeout(function() { window.scrollTo(0, 1); }, 1);
}, false);

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("demo");
  dragend = new Dragend(container, {
    afterInitialize: function() {
      container.style.visibility = "visible";

		var voice_button = document.getElementById('panel-101')
		var drum1 = document.getElementById('panel-201')
		var drum2 = document.getElementById('panel-202')
		var drum3 = document.getElementById('panel-203')
		var drum4 = document.getElementById('panel-204')
		var voicetog = false

    console.log(__.audioContext)

		voice_button.addEventListener('click', function(event) {
			console.log("voice_button click")
			voicetog = !voicetog;
			console.log(voicetog)
			if (voicetog === true){
				voice_button.classList.add("active")
				__("adc").volume(0.7)
			} else {
				voice_button.classList.remove("active")
				__("adc").volume(0)
			}
		})

		drum1.addEventListener('click', function(event) {
      unlock()
      this.classList.add("active")
      var msg = new SpeechSynthesisUtterance('saw')
      speechSynthesis.speak(msg)
			__("#bass").adsr("trigger")
			setInterval(function() {event.target.classList.remove("active")}, 500)
		})
		drum2.addEventListener('click', function(event) {
      unlock()
      this.classList.add("active")
      var msg = new SpeechSynthesisUtterance('sore')
      speechSynthesis.speak(msg)
			__("#kick").adsr("trigger")
			setInterval(function() {event.target.classList.remove("active")}, 500)
		})
		drum3.addEventListener('click', function(event) {
      unlock()
      this.classList.add("active")
      var msg = new SpeechSynthesisUtterance('soar')
      speechSynthesis.speak(msg)
			__("#snare").adsr("trigger")
			setInterval(function() {event.target.classList.remove("active")}, 500)
		})
		drum4.addEventListener('click', function(event) {
      unlock()
      this.classList.add("active")
      var msg = new SpeechSynthesisUtterance('sour')
      speechSynthesis.speak(msg)
			__("#hihat").adsr("trigger")
			setInterval(function() {event.target.classList.remove("active")}, 500)
		})

		__().sine({frequency:180}).adsr({id:"bass",envelope:0.8}).lowpass(120).compressor({release:0}).dac();
		__().sine(80).adsr({id:"kick",envelope:0.5}).connect("compressor"); //100ms envelope
		__().pink().adsr({id:"snare",envelope:0.3}).connect("compressor"); //50ms
		__().white().adsr({id:"hihat",envelope:0.3}).connect("compressor").play(); //10ms

		__().adc(0).overdrive().connect("dac")

		cracked.soundLoaded = function(x) {
      console.log("sample loaded", x)
		}

// set up basic variables for app

var record = document.querySelector('.record-button');
var soundClips = document.querySelector('.flex-container-3');
var mainSection = document.querySelector('.main-controls');
var node_id
// disable stop button while not recording

stop.disabled = true;

// visualiser setup - create web audio api context and canvas

//main block for doing the audio recording

  var chunks = [];

  initRecorder = function(stream) {
  	console.log(window.stream)
    var mediaRecorder = new MediaRecorder(window.stream);

    record.addEventListener('touchstart', function(event) {
      record.classList.add("active")
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.classList.add("active");
    })
      record.addEventListener('touchend', function(event) {
      record.classList.remove("active")
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
    })

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");
      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      var play_button = document.createElement('div');
      play_button.id = audioURL
      play_button.classList.add("play-button", "recorder-item")
      soundClips.appendChild(play_button)
      __().sampler({path: audioURL, id: audioURL, loop:true}).connect("dac");

      play_button.addEventListener('touchstart', function(event) {
        play_button.classList.add("active")
        node_id = "#" + this.id
        __(node_id).start()
      })
      play_button.addEventListener('touchend', function(event) {
        play_button.classList.remove("active")
        node_id = "#" + this.id
        __(node_id).stop()
      })
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  var onError = function(err) {
    console.log('The following error occured: ' + err);
  }


    }
  });
}, false)