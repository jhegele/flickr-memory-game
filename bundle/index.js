import 'babel-polyfill';
import Board from './board.js'

const getImages = (searchTerm, numCells) => {
    return new Promise((resolve, reject) => {
        let numImages = parseInt(numCells) / 2;
        $.ajax({
            type: 'POST',
            url: './get-images/' + searchTerm + '/' + numImages,
            success: (response) => {
                if (response.hasOwnProperty('errors')) {
                    console.log(response);
                    reject(response);
                } else {
                    resolve(response);
                }
            },
            error: (response) => {
                console.log(response);
                reject(response);
            }
        });
    });
}

const initState = () => {
    $('#gameTracker').hide();
    // $('#gameWin').hide();
    $('#gameSetup').show();
    $('#gameBoard').hide();
}

const setBindings = () => {
    // Start a game
    $('#formGameSetup').on('submit', e => {
        e.preventDefault();
        getImages($('#imageSearch').val(), $('#gameSize').val()).then(response => {
            global.board = new Board(response.photos);
            $('#gameContent')
                .empty()
                .append(board.build());
            $('#gameBoard').slideDown();
        });
    });
    // Select a card
    $(document).on('click', '.gameCell', e => {
        if (!$(e.target).hasClass('match') && !$(e.target).hasClass('cellImage')) {
            global.board.choose(e.target.id);
            if (global.board.win()) {
                $('#modalWin').modal('show');
            }
        }
    });
    // Play again
    $('#btnPlayAgain').on('click', e => {
        e.preventDefault();
        $('#modalWin').modal('hide');
        initState();
    })
    // I'm done
    $('#btnImDone').on('click', e => {
        e.preventDefault();
        $('#modalWin').modal('hide');
    })
}

$(() => {
    initState();
    setBindings();
});