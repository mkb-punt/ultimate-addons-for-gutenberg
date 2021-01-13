( function( $ ) {

	UAGBLottie = {

		_run: function( attr, id ) {
            
            console.log( 'none' === attr['playOn']);
            console.log( '------------------' );
            console.log( attr['loop']);

			var animation = bodymovin.loadAnimation({
                container: document.getElementsByClassName(id)[0],
                renderer: 'svg',
                loop: true,
                autoplay: false, 
                path: attr['lottieURl'],
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid',
                    className:"uagb-lottie-inner-wrap"
                }
            })

            animation.setSpeed(attr['speed'])

            const reversedir = (attr['reverse']) ? -1 : 1

            animation.setDirection(reversedir)
            
            if( 'hover' === attr['playOn']){
                document.getElementsByClassName(id)[0].addEventListener("mouseenter", function() {
                    animation.play()
                });
                document.getElementsByClassName(id)[0].addEventListener("mouseleave", function() {
                    animation.stop()
                });
            } else if ( 'click' === attr['playOn']){
                document.getElementsByClassName(id)[0].addEventListener("click", function() {
                    animation.play()
                });
            } else if ( 'scroll' === attr['playOn']) {
                window.addEventListener("scroll", function() {
                    animation.play()
                });
            }
		}
	}

} )( jQuery );