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
		var voicetog = false

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

		__().adc(0).overdrive().dac().start(); //10ms

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