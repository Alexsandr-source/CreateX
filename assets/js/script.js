const constructionPrev = document.querySelector('#constructionPrev');
const constructionNext = document.querySelector('#constructionNext');
const constructionBackground = document.querySelector('.construction__container')
const constructionBackgrounds = [
    {
        src: '../img/bg-image0.jpg'
    },
    {
        src: '../img/bg-image1.jpg'
    },
    {
        src: '../img/bg-image2.jpg'
    },
    {
        src: '../img/bg-image3.jpg'
    },
];

let constructionCount = constructionBackgrounds.length;
let constructionIndex = 0;

constructionPrev.addEventListener('click', constructionPrevBackground);
constructionNext.addEventListener('click', nextconstructionBackgrounds);
function constructionPrevBackground() {
    constructionIndex = (--constructionIndex + constructionCount) % constructionCount;
    updateBackground();
}
function nextconstructionBackgrounds() {
    constructionIndex = (++constructionIndex) % constructionCount;
    updateBackground();
}
function updateBackground() {
    constructionBackgrounds.forEach((background, index) => {
    if (index === constructionIndex) {
        background.style.url = constructionBackgrounds[constructionIndex];
    } else {
        background.style.url = constructionBackgrounds[constructionIndex];
    }
});
}
