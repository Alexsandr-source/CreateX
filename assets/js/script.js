const constructionPrev = document.querySelector('#constructionPrev');
const constructionNext = document.querySelector('#constructionNext');
const constructionBackground = document.querySelector('.construction');
const constructionNumber = document.querySelector('#constructionNumber');
const constructionNumbers = Array.from(constructionNumber.querySelectorAll('.reviews__btn'));
const constructionBackgrounds = [
    "assets/img/bg-image0.png",
    "assets/img/bg-image1.png",
    "assets/img/bg-image2.png",
    "assets/img/bg-image3.png",
];

let constructionCount = constructionBackgrounds.length;
let constructionIndex = 0;
let numberCount = constructionNumbers.length;
let numberIndex = 0;

constructionPrev.addEventListener('click', constructionPrevBackground);
constructionNext.addEventListener('click', nextconstructionBackgrounds);
function constructionPrevBackground() {
    constructionIndex = (--constructionIndex + constructionCount) % constructionCount;
    numberIndex = (--numberIndex + numberCount) % numberCount;
    updateNumber(numberIndex)
    updateBackground();
};
function nextconstructionBackgrounds() {
    constructionIndex = (++constructionIndex) % constructionCount;
    numberIndex = (++numberIndex) % numberCount;
    updateNumber(numberIndex)
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
function updateNumber() {
    constructionNumbers.forEach((number, index) => {
        if (index === numberIndex) {
            number.classList.add('construction__number__active')
        } else {
            number.classList.remove('construction__number__active')
        }
    });
    constructionNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            numberIndex = index;
            updateBackground();
        })
    })
}
updateNumber();
updateBackground();