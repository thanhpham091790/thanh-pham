
/* Start: Use fetch to retrieve the projects. */
fetch('./database/portfolios.json').then(
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
        renderNavSection(json.nav);
        renderHeaderSection(json.header);
        renderPortfolioSection(json.portfolio);
        renderAboutSection(json.about);
        renderSkillsSection(json.skills);
        renderContactSection(json.contact);
    }
).catch(
    (err) => {
        // Illustrate the fetch problem.
        console.error(`Fetch problem: ${err.message}`);
    }
);

/* Rendering nav section from database.
 <svg id="menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
        d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
</svg>
<div id="drop-down">
    <svg id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
    </svg>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#portfolio">Portfolios</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul> 
</div>
*/
const nav = document.querySelector('nav');
function renderNavSection(data) {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const div = document.createElement('div');
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const ul = document.createElement('ul');

    path2.setAttribute('d', 'M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z');
    svg2.setAttribute('id', 'close');
    svg2.setAttribute('viewBox', '0 0 320 512');
    svg2.appendChild(path2);
    div.setAttribute('id', 'drop-down');
    div.appendChild(svg2);
    path1.setAttribute('d', 'M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z');
    svg1.setAttribute('id', 'menu');
    svg1.setAttribute('viewBox', '0 0 448 512');
    svg1.appendChild(path1);
    nav.appendChild(svg1);
    nav.appendChild(div);
    if (data.length != 0) {
        data.forEach(element => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', `${element.url}`);
            a.textContent = `${element.name}`;
            a.addEventListener('click', () => {
                svg1.style.display = 'block';
                div.style.transform = 'translateX(100%)';
            });
            li.appendChild(a);
            ul.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = 'No data';
        li.appendChild(a);
        ul.appendChild(li);
    }
    div.appendChild(ul);
    svg1.addEventListener('click', () => {
        div.style.transform = 'translateX(0%)';
        svg1.style.display = 'none';
    });
    svg2.addEventListener('click', () => {
        svg1.style.display = 'block';
        div.style.transform = 'translateX(100%)';
    });
}

/* Rendering the header section from database.
    <h1>Thanh Pham</h1>
    <p>Front-End Web Developer</p>
    <img src="assets/header/profile_pic.jpg">
    <button class="btn resume">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
        </svg>
        <span>Download Resume</span>
    </button>
*/
const header = document.querySelector('#header');
function renderHeaderSection(data) {
    if (data.length != 0) {
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const span = document.createElement('span');

        span.textContent = `${data[0].button[0].name}`;
        path.setAttribute('d', 'M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z');
        svg.setAttribute('viewBox', '0 0 512 512');
        button.setAttribute('class', 'btn resume');
        fetch(data[0].image).then(
            (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            }
        ).then(
            (response) => {
                const src = URL.createObjectURL(response);
                img.setAttribute('src', `${src}`);
            }
        ).catch(
            (err) => {
                console.error(`Fetch Problem: ${err.message}`);
            }
        );
        p.textContent = `${data[0].title}`;
        h1.textContent = `${data[0].name}`;

        header.appendChild(h1);
        header.appendChild(p);
        header.appendChild(img);
        svg.appendChild(path);
        button.appendChild(svg);
        button.appendChild(span);
        button.addEventListener('click', () => {
            fetch(data[0].button[0].url).then(
                (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.blob();
                }
            ).then(
                (response) => {
                    window.open(URL.createObjectURL(response));
                }
            ).catch(
                (err) => {
                    console.error(`Fetch Problem: ${err.message}`);
                }
            );

        });
        header.appendChild(button);
    }
}

/* Rendering the portfolio section from database.
<div id="filter-container">
    <button id="all" class="btn active"> Show all</button>
    <button id="nature" class="btn"> Nature</button>
    <button id="cars" class="btn"> Cars</button>
    <button id="people" class="btn"> People</button>
</div>
<div id="grid-container">
    <div class="column show nature">
        <div class="content">
            <img src="assets/portfolio/thp.jpg" alt="Mountains">
            <div class="overlay">
                <h3>Mountains</h3>
                <button class="btn">
                    <span>Preview</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
*/
const filter = document.querySelector('#filter-container');
const grid = document.querySelector('#grid-container');
function renderPortfolioSection(data) {

    // finalGroup contains an array of projects that need to be displayed.
    let finalGroup;

    // To start, set finalGroup equals the entire projects database.
    finalGroup = data;

    // Run updateDisplay() so all projects are displayed initially.
    updateDisplay(finalGroup);

}

function updateDisplay(finalGroup) {
    if (finalGroup.length === 0) {
        // Show message  if no project in database
        const para = document.createElement('p');
        para.textContent = 'No projects to display!';
        grid.appendChild(para);
    } else {
        // Grid container.
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        for (const project of finalGroup) {
            fetchBlob(project);
        }

        // Filter container.
        let filterTypes = finalTypes = [];
        for (project of finalGroup) {
            filterTypes = filterTypes.concat(project.type.split(' ').join('').split(','));
        }
        finalTypes = filterTypes.filter((value, index, array) => {
            if (array.indexOf(value) === index) {
                return true;
            }
        });

        if (finalTypes.length >= 2) {
            finalTypes.unshift('all');
        }

        for (const type of finalTypes) {
            showFilter(type);
        }
    }
}


// Illustrate filter button inside filter-container element.
function showFilter(type) {
    const filterBtn = document.createElement('button');
    filterBtn.setAttribute('id', `${type}`);
    filterBtn.setAttribute('class', 'btn');
    if (type == 'all') {
        filterBtn.classList.add('active');
    }
    filterBtn.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}`;
    filterBtn.addEventListener('click', () => {
        porfolioFilter(type);
    });

    filter.appendChild(filterBtn);
}


function porfolioFilter(type) {
    const btnList = filter.querySelectorAll('.btn');
    const columns = grid.querySelectorAll('.column');
    // Add 'active' class to filter button when button was clicked.
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].classList.remove('active');
        if (btnList[i].id == type) {
            btnList[i].classList.add('active');
        }
    }

    // Add 'show' class to all column when 'all' button was clicked.
    if (type == 'all') {
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i].classList.contains(type)) {
                columns[i].classList.add('show');
            }
        }
    } else { // Otherwise, only add 'show' class to responding column.
        for (let i = 0; i < columns.length; i++) {
            columns[i].classList.remove('show');
            if (columns[i].classList.contains(type)) {
                columns[i].classList.add('show');
            }
        }
    }

}

// Prepare needed things of a project before display.
function fetchBlob(project) {
    // Contruct the URL path to the image file from the product.image property.
    // const url = `assets/portfolio/${project.image}`;
    const url = 'assets/portfolio/bg.jpg';

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

// Illustrate project inside grid-container element.
function showProject(blob, project) {
    // Convert the blob to an object URL - this is basically an temporary internal URL
    // that points to an object stored inside the browser.
    const objectURL = URL.createObjectURL(blob);
    // Create HTML elements
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const liveBtn = document.createElement('button');
    const span = document.createElement('span');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // Set attribute and text content for elements.
    div1.setAttribute('class', `column show ${project.type}`);
    div2.setAttribute('class', 'content');
    div3.setAttribute('class', 'overlay');
    img.setAttribute('src', `${objectURL}`);
    img.setAttribute('alt', `${project.name}`);
    h3.textContent = `${project.name}`;
    liveBtn.setAttribute('class', 'btn');
    span.textContent = 'Live Preview';
    svg.setAttribute('viewBox', '0 0 448 512');
    path.setAttribute('d', 'M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z');


    // Add 'click' event to redirect to demo link.
    liveBtn.addEventListener('click', () => {
        window.open(`${project.link}`);
    });

    // Append child's elements into parent's elements.
    svg.appendChild(path);
    liveBtn.appendChild(span);
    liveBtn.appendChild(svg);
    div3.appendChild(h3);
    div3.appendChild(liveBtn);
    div2.appendChild(img);
    div2.appendChild(div3);
    div1.appendChild(div2);
    let theFirstChild = grid.firstChild;
    if (grid.firstChild != null) {
        grid.insertBefore(div1, theFirstChild);
    } else {
        grid.appendChild(div1);
    }
}

/* Rendering the about section from database.
<p>My name is Thanh Pham. I am a front end web developer based in Colorado, USA. 
I describe myself a passionate developer who loves coding, open source, and the web platform. 
I would love to create and contribute my work to help friends and local business. 
That helps me to learn a ton of new stuff, grow as a developer. 
In my free time, I would like to go fishing , go gym, or hiking around Colorado with my friends.</p>
*/
const about = document.querySelector('#about');
function renderAboutSection(data) {
    const para = document.createElement('p');
    para.textContent = `${data[0].content}`;
    about.appendChild(para);
}

/* Rendering the skills section from database.
<div class="skill-groups">
    <div class="container">
        <p>HTML</p>
        <div class="bar">
            <div class="percent">90%</div>
        </div>
    </div>
</div>
<button class="btn resume">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
    </svg>
    <span>Download Resume</span>
</button>
*/
const skills = document.querySelector('#skills');
function renderSkillsSection(data) {
    const skill_groups = document.createElement('div');
    skill_groups.setAttribute('class', 'skill-groups');
    data.forEach(element => {
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        const p = document.createElement('p');
        p.textContent = `${element.name}`;
        const bar = document.createElement('div');
        bar.setAttribute('class', 'bar');
        const percent = document.createElement('div');
        percent.setAttribute('class', 'percent');
        percent.textContent = `${element.percent}`;
        let percentIndex = `${element.percent}`.indexOf('%');
        let num = parseInt(`${element.percent}`.slice(0, percentIndex));
        percent.style.width = `${num}%`;
        bar.appendChild(percent);
        container.appendChild(p);
        container.appendChild(bar);
        skill_groups.appendChild(container);
    });
    skills.appendChild(skill_groups);
}

/* 
Rendering the contact section from database. 
*/

function renderContactSection(data) {
    const address = document.querySelector('#mail');
    const p1 = document.createElement('p');
    p1.textContent = `${data[0].address}`;
    address.appendChild(p1);

    const phone = document.querySelector('#phone');
    const p2 = document.createElement('p');
    p2.textContent = `${data[0].phone}`;
    phone.appendChild(p2);

    const email = document.querySelector('#email');
    const p3 = document.createElement('p');
    p3.textContent = `${data[0].email}`;
    email.appendChild(p3);
}
/* End: Use fetch to retrieve the projects. */

/* Start: Add some javascript for map. */
L.mapquest.key = '8bjlbcHoGVSkdZiGpfRlGbHFIItuSEnO';

// 'map' refers to a <div> element with the ID map
const map = L.mapquest.map('map', {
    center: [39.6296192, -104.9755648],
    layers: L.mapquest.tileLayer('light'),
    zoom: 12
});
/* End: Add some javascript for map. */