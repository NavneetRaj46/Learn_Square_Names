'use strict';

window.onload = function() {

    let transtable_rows = {0:'1',1:'2',2:'3',3:'4',4:'5',5:'6',6:'7', 7:'8'},
        transtable_cols = {0:'h',1:'g',2:'f',3:'e',4:'d',5:'c',6:'b', 7:'a'},

        element = document.getElementById('board'),
        rectangle = null, size = null, border_size = null, square_size = null,

        clickinfo = document.getElementById('clickinfo'),
        info_font_size = null;

    function get_dimensions(){
        rectangle = element.getBoundingClientRect();

        let size_with_border = rectangle.right - rectangle.left;

        border_size = 0; // found by trial and error
        size = size_with_border - (2 * border_size);
        square_size = size / 8;

        let s = clickinfo.style;

        s.fontSize = (square_size * 0.7) + 'px';

        let info_size = square_size + 'px';

        s.width = info_size;
        s.height = info_size;
    }

    get_dimensions();

    // let the board listen for click events.
    element.addEventListener("click", (event) => {

        // Where the user clicked in the board. 0,0 ist top left.
        let x = event.clientX - rectangle.left - border_size,
            y = event.clientY - rectangle.top - border_size;

        // Only do something if the user has not clicked on the border.
        if (x > 0 && y > 0 && x < size && y < size) {

            // Get the normalized square indices (0,0 to 7,7).
            x = Math.round((x - (x % square_size)) / square_size);
            y = Math.round((y - (y % square_size)) / square_size);

            // Get the matching square name. eg. 0,0 is 'a8', 7,7 is 'h1'.
            let row = transtable_rows[y],
                col = transtable_cols[x];

            // update the text and position of the info shown over the square which got clicked.
            let c = clickinfo;

            c.textContent = col + row;

            let s = c.style;

            s.top = (rectangle.top + border_size + (square_size * y)) + 'px';
            s.left = (rectangle.left + border_size + (square_size * x)) + 'px';
            c.classList.add('active');

            // play the first audio file
            let col_audio = document.getElementById(col);
            let row_audio = document.getElementById(row);

            col_audio.play();

            // play the second audio file when the first has finished and hide the info again.
            col_audio.onended = () => {
                row_audio.play();
                clickinfo.classList.remove('active');
            }
        }
    }, true);

    // Calculate the needed board and info dimensions new when the user resizes the window.
    window.addEventListener('resize', (event) => {
        get_dimensions();
    }, true);
};
