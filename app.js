;(function ($) {
    $(document).ready(function () {
        var words = ['ba', 'be', 'bi', 'bodda', 'bop', 'bope', 'da', 'dib', 'dibby', 'dub', 'im', 'scatman', 'ski', 'the', 'yo'];

        function newWord() {
            function pickWord() {
                return words[Math.floor(Math.random() * words.length)]
            }

            $('#game-field').empty();

            var word = pickWord()

            for (var l = 0 ; l < word.length; l++) {
                var char = word.charAt(l);
                var $char = $('<span class="l' + char +'"></span>').text(char);
                $('#game-field').append($char);
            }

            return word;
        }

        // start

        var word = newWord();
        var score = 0;


        $(document).on('keydown', function (e) {
            var c = String.fromCharCode(e.which).toLowerCase();

            console.log(c);

            if (-1 < word.indexOf(c)){
                console.log('#game-field .l' + c);
                $('#game-field .l' + c).css('color', 'red').addClass('h');
            }

            var countHighlighted = $('span.h').length

            console.log(countHighlighted);

            if (countHighlighted == word.length) {
                word = newWord();
                $('#score').text(++score);
            }
        });
    })
})(jQuery)

