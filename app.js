;(function ($) {
    $(document).ready(function () {

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

        // start

        var word = newWord();
        var score = 0;

        console.log(word);


        $(document).on('keydown', function (e) {
            var c = String.fromCharCode(e.which).toLowerCase();

            console.log(c);

            if (-1 < word.indexOf(c)){
                console.log('#game-field .l' + c);
                $('#game-field .l' + c).css('color', 'red').addClass('h');
            }

            var countHighlighted = $('span.h').length

            console.log(countHighlighted);

            var properWord = word.replace(/\W/g, '')
            console.log('proper word length', properWord.length);
            console.log('proper word', properWord);

            if (countHighlighted == properWord.length) {
                word = newWord();
                $('#score').text(++score);
            }
        });
    })
})(jQuery)

