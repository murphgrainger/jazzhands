;(function ($) {
    $(document).ready(function () {
        // audio

        function playSound() {
            const audio = document.querySelector(`audio[data-key="${Math.floor(Math.random()*9)}"]`); // stop the fucntion from running all together
            audio.currentTime = 0; // rewind to the start
            audio.play();
        }

        // owrds

        function newWord() {
            var words = ['ba', 'be', 'bi', 'bodda', 'bop', 'bope', 'da', 'dib', 'dibby', 'dub', 'im', 'scatman', 'ski', 'the', 'yo'];

            function pickWord() {
                return words[Math.floor(Math.random() * words.length)]
            }

            $('#game-field').empty();

            var words3 = [];
            for( i = 0; i < 3 ; i++  ) {
                var pick = pickWord();
                console.log(pick);
                words3.push(pick);
            }

            console.log(words3);

            var word = words3.join( ' ' );

            for (var l = 0 ; l < word.length; l++) {
                var char = word.charAt(l);

                var $char = $('<span></span>').text(char);
                $('#game-field').append($char);

                if (char !== ' ') {
                    $char.addClass( 'l' + char)
                }
            }

            return word;
        }

        // fingers

        let lpinky =['a','q','z'];
        let lring = ['w','s','x'];
        let lmiddle= ['e','d','c'];
        let lpointer = ['r','f','v', 't','g'];
        let rpointer =['b', 'n','h','y'];
        let rmiddle = ['u','j','m'];
        let rring = ['i', 'k'];
        let rpinky = ['l', 'o', 'p'];
        let fingers = {lPinky: {letters: lpinky}, lRing: {letters: lring}, lMiddle: {letters: lmiddle}, rPointer: {letters: rpointer}, rMiddle: {letters: rmiddle}, rRing: {letters: rring}, rPinky: {letters: rpinky}}

        function findLetter(letter) {
            for(var finger in fingers) {
                if(fingers[finger].letters.includes(letter)) {
                    return finger
                }
            }
        }

        // start

        var word = newWord();
        var score = 0;

        $(document).on('keydown', function (e) {
            var c = String.fromCharCode(e.which).toLowerCase();

            if (-1 < word.indexOf(c)){
                $('#game-field .l' + c).css('color', 'red').addClass('h');

                // highlight finger
                var finger = findLetter(c);

                $('#fingers').children().hide();
                $('#fingers').find('.' + finger).show();
            }

            var countHighlighted = $('span.h').length
            var properWord = word.replace(/\W/g, '')

            playSound();

            if (countHighlighted == properWord.length) {
                word = newWord();
                $('#score').text(++score);
            }
        });

        $(document).on('keyup', function () {
            $('#fingers').children().hide();
            $('#fingers').find('.empty').show();
        })

        // svgs

        jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });

    })
})(jQuery)

