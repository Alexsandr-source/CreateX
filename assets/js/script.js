const constructionPrev = document.querySelector('#constructionPrev');
const constructionNext = document.querySelector('#constructionNext');
const constructionBackground = document.querySelector('.construction');
const constructionNumber = document.querySelector('#constructionNumber');
const constructionNumbers = Array.from(constructionNumber.querySelectorAll('.construction__number'));
const constructionBackgrounds = [
    "assets/img/bg-image0.png",
    "assets/img/bg-image1.png",
    "assets/img/bg-image2.png",
    "assets/img/bg-image3.png",
];

let constructionCount = constructionBackgrounds.length;
let constructionIndex = 0;

constructionPrev.addEventListener('click', constructionPrevBackground);
constructionNext.addEventListener('click', nextconstructionBackgrounds);
function constructionPrevBackground() {
    constructionIndex = (--constructionIndex + constructionCount) % constructionCount;
    updateNumber()
    updateBackground();
};
function nextconstructionBackgrounds() {
    constructionIndex = (++constructionIndex) % constructionCount;
    updateNumber()
    updateBackground();
};
function updateBackground() {
    for(index in constructionBackgrounds) {
        if (index === constructionIndex) {
            constructionBackground.style.backgroundImage = 'url("'+constructionBackgrounds[constructionIndex]+'")';
        } else {
            console.log(constructionBackgrounds[constructionIndex])
            constructionBackground.style.backgroundImage = 'url("'+constructionBackgrounds[constructionIndex]+'")';
        }
    };
};
const updateNumber = (index) => {
    for (let number of constructionNumbers) {
        number.classList.remove('construction__number__active')
    }
    console.log(constructionNumbers);
    constructionNumbers[constructionIndex].classList.add('construction__number__active')
}
constructionNumbers.forEach((number, index) => {
    number.addEventListener('click', () => {
        constructionIndex = index;
        updateNumber(constructionIndex)
        updateBackground();
    })
})
updateNumber();
updateBackground();