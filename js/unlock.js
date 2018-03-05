var isUnlocked = false;

function unlock() {

			

	if(this.isUnlocked){
		return;
	} else {

	console.log("unlock webaudio")
	// create empty buffer and play it

	var buffer = cracked.audioContext.createBuffer(1, 1, 22050);

	var source = cracked.audioContext.createBufferSource();

	source.buffer = buffer;

	source.connect(cracked.audioContext.destination);

	source.start(0);



	// by checking the play state after some time, we know if we're really unlocked

	setTimeout(function() {

		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {

			isUnlocked = true;

		}

	}, 0);	
	}
}
