(function($) {

  // Get the .gif images from the "data-alt".
	var getGif = function() {
		var gif = [];
		$('img').each(function() {
			var data = $(this).data('alt');
			gif.push(data);
		});
		return gif;
	}

	var gif = getGif();

	// Preload all the gif images.
	var image = [];

	$.each(gif, function(index) {
		image[index]     = new Image();
		image[index].src = gif[index];
	});
	var audio = new Audio("slurp_3_short.mp3");
	var lick = new Audio("slurp_2.mp3")
	var count = 0;

	//Make multiple audio channels
	var channel_max = 10;										// number of channels
	audiochannels = new Array();
	for (a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;							// expected end time for this channel
	}
	
	// Change the image to .gif when clicked
	$('figure').on('click', function() {

		var $this   = $(this),
				$index  = $this.index(),
				
				$img    = $this.children('img'),
				$imgSrc = $img.attr('src'),
				$imgAlt = $img.attr('data-alt'),
				$imgExt = $imgAlt.split('.');
		
			$img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
			

			for (a=0;a<audiochannels.length;a++) {
				thistime = new Date();
				if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
					if (count == 68) {
					audiochannels[a]['finished'] = thistime.getTime() + document.getElementById("multiaudio2").duration*2000;
					audiochannels[a]['channel'].src = document.getElementById("multiaudio2").src;
					audiochannels[a]['channel'].load();
					audiochannels[a]['channel'].play();
					$("p").removeClass("sixtynine-hidden");
					$("p").addClass("sixtynine-show");
					break;
					} else {
						audiochannels[a]['finished'] = thistime.getTime() + document.getElementById("multiaudio1").duration*1000;
						audiochannels[a]['channel'].src = document.getElementById("multiaudio1").src;
						audiochannels[a]['channel'].load();
						audiochannels[a]['channel'].play();
						$("p").removeClass("sixtynine-show");
						$("p").addClass("sixtynine-hidden");
						break;

					}
				}
			}
			count++;
}
	



	);

})(jQuery);
