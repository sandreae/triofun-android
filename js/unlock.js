var isUnlocked = false;

function unlock() {

			

	if(this.isUnlocked){
		return;
	} else {

	console.log("unlock webaudio")
	// create empty buffer and play it

	var myContext = cracked.audioContext

	var buffer = myContext.createBuffer(1, 1, 22050);

	var source = myContext.createBufferSource();

	source.buffer = buffer;

	source.connect(myContext.destination);

	source.start(0);



	// by checking the play state after some time, we know if we're really unlocked

	setTimeout(function() {

		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {

			isUnlocked = true;

		}

	}, 0);	
	}
}
