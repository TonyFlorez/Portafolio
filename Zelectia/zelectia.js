let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carruselDom = document.querySelector('.carrusel');
let listItemDom = document.querySelector('.carrusel .list');
let thumbnailDom = document.querySelector('.carrusel .thumbnail');
let thumbnails = document.querySelectorAll('.thumbnail .item');

nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

let timeRunning = 500;
let timeAutoNext = 30000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.carrusel .list .item');
    let itemThumbnail = document.querySelectorAll('.carrusel .thumbnail .item');

    if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carruselDom.classList.add('next');
    } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carruselDom.classList.add('prev');
    }

    // Marcar miniatura activa
    updateActiveThumbnail();

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carruselDom.classList.remove('next');
        carruselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Click en miniaturas
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        goToSlide(index);
    });
});

function goToSlide(index) {
    let itemSlider = document.querySelectorAll('.carrusel .list .item');

    // Si es la actual, no mover
    if (index === 0) return;

    let totalSlides = itemSlider.length;
    let forwardSteps = index;
    let backwardSteps = totalSlides - index;

    if (forwardSteps <= backwardSteps) {
        for (let i = 0; i < forwardSteps; i++) {
            showSlider('next');
        }
    } else {
        for (let i = 0; i < backwardSteps; i++) {
            showSlider('prev');
        }
    }
}

// Función para marcar miniatura activa
function updateActiveThumbnail() {
    let thumbs = document.querySelectorAll('.thumbnail .item');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[0].classList.add('active'); // La primera siempre es la visible
}

// Inicializar la primera como activa
updateActiveThumbnail();



