
const menu_icon = document.querySelector('#menu');
const close_icon = document.querySelector('#close');
const mobile_nav = document.querySelector('#drop-down');


menu_icon.addEventListener('click', () => {
    mobile_nav.style.display = 'block';
    menu_icon.style.display = 'none';
});

close_icon.addEventListener('click', () => {
    menu_icon.style.display = 'block';
    mobile_nav.style.display = 'none';
});



const filterContainer = document.querySelector('#filter-container');
const btnList = filterContainer.querySelectorAll('.btn');
const gridContainer = document.querySelector('#grid-container');
const columns = gridContainer.querySelectorAll('.column');

function porfolioFilter(id) {
    // Add 'active' class to filter button when button was clicked.
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].classList.remove('active');
        if (btnList[i].id == id) {
            btnList[i].classList.add('active');
        }
    }

    // Add 'show' class to all column when 'all' button was clicked.
    if (id == 'all') {
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i].classList.contains(id)) {
                columns[i].classList.add('show');
            }
        }
    } else { // Otherwise, only add 'show' class to responding column.
        for (let i = 0; i < columns.length; i++) {
            columns[i].classList.remove('show');
            if (columns[i].classList.contains(id)) {
                columns[i].classList.add('show');
            }
        }
    }

}

// Attach 'click' event to all filter buttons.
for (let i = 0; i < btnList.length; i++) {
    let btnId = btnList[i].id;
    btnList[i].addEventListener('click', () => {
        porfolioFilter(btnId);
    });
}


const percentList = document.querySelectorAll('.percent');
for (let i = 0; i < percentList.length; i++) {
    let text = percentList[i].textContent;
    let percentIndex = text.indexOf('%');
    let num = parseInt(text.slice(0, percentIndex));
    console.log(num);
    percentList[i].style.width = `${num}%`;
}