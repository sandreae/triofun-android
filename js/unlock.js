var isUnlocked = false;

function unlock() {


	// create empty buffer and play it

	var myContext = cracked.audioContext

	var buffer = myContext.createBuffer(1, 1, 22050);
	console.log(buffer)
	var source = myContext.createBufferSource();
	console.log(source)
	source.buffer = buffer;
	console.log(myContext.destination)
	source.connect(myContext.destination);

	source.start(0);



	// by checking the play state after some time, we know if we're really unlocked

	setTimeout(function() {

		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {

			isUnlocked = true;

		}

	}, 0);



}
