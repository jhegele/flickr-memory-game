export default class Board {

    constructor(images) {
        this.images = images;
        this.numCells = images.length * 2;
        this.squareSize = Math.pow((images.length * 2), 0.5);
        this.cells = [];
        this.flipped = [];
        this.matches = 0;
        this.guesses = 0;
    }

    win() {
        return this.matches === this.images.length;
    }

    choose(cellId) {
        let re = /\d+/;
        let id = parseInt(re.exec(cellId)[0]);
        if (this.flipped.length < 2) {
            this.cells[id].show();
            this.flipped.push(id);
        }
        if (this.flipped.length === 2) {
            if (this.cells[this.flipped[0]].image === this.cells[this.flipped[1]].image) {
                this.cells[this.flipped[0]].match();
                this.cells[this.flipped[1]].match();
                this.matches++;
            } else {
                let flipped0 = this.flipped[0];
                let flipped1 = this.flipped[1];
                setTimeout(() => {
                    this.cells[flipped0].hide();
                    this.cells[flipped1].hide();
                }, 1750);
            }
            this.flipped = [];
            this.guesses++;
            $('#gameMatches').text(this.matches);
            $('#gameTurns').text(this.guesses);
        }
    }

    build() {
        $('#gameSetup').slideUp(() => {
            $('#gameTracker').slideDown(() => {
                $('#gameMatches').text(this.matches);
                $('#gameTurns').text(this.guesses);
            });
        });
        let imageArray = shuffle(this.images.concat(this.images));
        let boardHtml = $('<div>', {class: 'gameBoard mx-auto'});
        for (let i = 1; i <= this.squareSize; i++) {
            let cellsHtml = $('<div>', {class: 'col-sm-12'});
            for (let j = 1; j <= this.squareSize; j++) {
                let cellIndex = ((i - 1) * this.squareSize + j) - 1;
                let cell = new Cell(cellIndex, imageArray[cellIndex]);
                this.cells.push(cell);
                cellsHtml.append(cell.generate());
            }
            boardHtml.append(
                $('<div>', {class: 'row'}).append(cellsHtml)
            );
        }
        return boardHtml;
    }

}

class Cell {

    constructor(index, image) {
        this.index = index;
        this.image = image;
        this.matched = false;
        this.id = 'cell' + index.toString();
    }

    show() {
        $('#' + this.id)
            .removeClass('hide')
            .addClass('show')
            .append($('<img>', {src: this.image, class: 'cellImage'}));
    }

    hide() {
        $('#' + this.id)
            .removeClass('show')
            .addClass('hide')
            .empty();
    }

    match() {
        $('#' + this.id)
            .addClass('match');
    }

    generate() {
        return $('<div>', {class: 'gameCell hide', id: this.id});
    }

}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}