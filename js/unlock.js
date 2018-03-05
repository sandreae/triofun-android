var isUnlocked = false;
var AudioContext = window.AudioContext || window.webkitAudioContext;
window.myContext = new AudioContext();

function unlock() {

			

	if(this.isUnlocked){
		return;
	} else {

	console.log("unlock webaudio")
	
	// create empty buffer and play it


	var buffer = window.myContext.createBuffer(1, 1, 22050);

	var source = window.myContext.createBufferSource();

	source.buffer = buffer;

	source.connect(window.myContext.destination);

	source.start(0);



	// by checking the play state after some time, we know if we're really unlocked

	setTimeout(function() {

		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {

			isUnlocked = true;
			console.log(window.myContext)

		}

	}, 0);	
	}
}
