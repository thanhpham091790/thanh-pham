/* Start: Add some javascripts for navigation bar. */
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
/* End: Add some javascripts for navigation bar. */


/* Start: Add some javascript for portfolio filter. */
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
/* End: Add some javascript for portfolio filter. */


/* Start: Add some javascript for percent bar. */
const percentList = document.querySelectorAll('.percent');
for (let i = 0; i < percentList.length; i++) {
    let text = percentList[i].textContent;
    let percentIndex = text.indexOf('%');
    let num = parseInt(text.slice(0, percentIndex));
    percentList[i].style.width = `${num}%`;
}

/* Start: Add some javascript for percent bar. */


/* Start: Add some javascript for map. */
L.mapquest.key = '8bjlbcHoGVSkdZiGpfRlGbHFIItuSEnO';

// 'map' refers to a <div> element with the ID map
const map = L.mapquest.map('map', {
    center: [39.6296192, -104.9755648],
    layers: L.mapquest.tileLayer('light'),
    zoom: 12
});
/* End: Add some javascript for map. */


/* Start: Use fetch to retrieve the projects. */

// Grab UI elements that we need to manipulate
const grid = document.querySelector('#grid-container');

fetch('database/portfolios.json').then(
    (response) => {
        if (!response.ok) {
            // Report any errors that occur in the fetch operation.
            throw new Error(`HTTP error: ${response.status}`);
        }
        // Using response.json() to format projects as a JSON object.
        return response.json();
    }
).then(
    // Run the initialize() function to process JSON data.
    (json) => {
        initialize(json);
    }
).catch(
    (err) => {
        // Illustrate the fetch problem.
        console.error(`Fetch problem: ${err.message}`);
    }
);


// Setup the app logic, declares required variable, contains all the other functions.
function initialize(projects) {

    // finalGroup contains an array of projects that need to be displayed.
    let finalGroup;

    // To start, set finalGroup equals the entire projects database.
    finalGroup = projects;

    // Run updateDisplay() so all projects are displayed initially.
    updateDisplay(finalGroup);

}

function updateDisplay(finalGroup) {
    if (finalGroup.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results to display!';
        grid.appendChild(para);
    } else {
        let theFirstChild = grid.firstChild;

        const para = document.createElement('p');
        para.textContent = `There are ${finalGroup.length} projects!`;
        grid.insertBefore(para, theFirstChild);

        for (const project of finalGroup) {
            fetchBlob(project);
        }
    }
}

function fetchBlob(project) {
    // Contruct the URL path to the image file from the product.image property.
    const url = `assets/portfolio/${project.image}`;

    // Use fetch to fetch the image.
    fetch(url).then(
        (response) => {
            // Check and throw an error if an error occurs while fetch.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Convert the resulting response to a blob.
            return response.blob();
        }
    ).then(
        (blob) => {
            // Run showProject to display product.
            showProject(blob, project);
        }
    ).catch(
        (err) => {
            console.error(`Fetch Problem: ${err.message}`);
        }
    );
}

// Illustrate project inside grid-container element
function showProject(blob, project) {
    // Convert the blob to an object URL - this is basically an temporary internal URL
    // that points to an object stored inside the browser.
    const objectURL = URL.createObjectURL(blob);
    // Create HTML elements
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const btn = document.createElement('button');
    const span = document.createElement('span');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // Set attribute and text content for elements.
    div1.setAttribute('class', `column show ${project.type}`);
    div2.setAttribute('class', 'content');
    img.setAttribute('src', `${objectURL}`);
    img.setAttribute('alt', `${project.name}`);
    h3.textContent = `${project.name}`;
    btn.setAttribute('class', 'btn');
    span.textContent = 'Live Preview';
    svg.setAttribute('viewBox', '0 0 448 512');
    path.setAttribute('d', 'M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z');


    // Add 'click' event to redirect to demo link.
    btn.addEventListener('click', () => {
        location.href = `${project.link}`;
    });

    // Append child's elements into parent's elements.
    svg.appendChild(path);
    btn.appendChild(span);
    btn.appendChild(svg);
    div2.appendChild(img);
    div2.appendChild(h3);
    div2.appendChild(btn);
    div1.appendChild(div2);
    grid.appendChild(div1);

}

/* End: Use fetch to retrieve the projects. */