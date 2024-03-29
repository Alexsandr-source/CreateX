const changeConButton = document.querySelectorAll('.construction__button');
const changeWorButton = document.querySelectorAll('.ourWork__button');
const learnMore = document.querySelector('#learnMore');
const submitRequest = document.querySelector('#submitRequest');
const arrowLeft = document.querySelector('#arrowLeft');
const arrowRight = document.querySelector('#arrowRight');
const constructionPrev = document.querySelector('#constructionPrev');
const constructionNext = document.querySelector('#constructionNext');
const constructionBackground = document.querySelector('.construction');
const constructionNumber = document.querySelector('#constructionNumber');
const com = document.querySelector('.com');
const videoHub = document.querySelector('.video__hud');
const video = document.querySelector('.video');
const videoPlayer = document.getElementById('video-player');
const progressLine = document.getElementById('video-hud__progress-line');
const currTime = document.getElementById('video-hud__curr-time');
const durationTime = document.getElementById('video-hud__duration');
const actionButton = document.getElementById('video-hud__action');
const actionImage = document.querySelector('.video__hud__action_img');
const lineVideo = document.querySelector('.video__hud__progress_line')
const workSlider = document.querySelector('.ourWork__slider');
const workSlides = Array.from(workSlider.querySelectorAll('.ourWork__pillars'));
const workButtons = document.querySelectorAll('.ourWork__column-button');
const workColumns = document.querySelectorAll('.ourWork__column');
const constructionNumbers = Array.from(constructionNumber.querySelectorAll('.construction__number'));
const constructionBackgrounds = [
    "assets/img/bg-image0.png",
    "assets/img/bg-image1.png",
    "assets/img/bg-image2.png",
    "assets/img/bg-image3.png",
];
let constructionCount = constructionBackgrounds.length;
let constructionIndex = 0;
let workSliderCount = workSlides.length;
let workSliderIndex = 0;
let workIndex = 0;

learnMore.addEventListener('click', changesConButton);
submitRequest.addEventListener('click', changesConButton);
function changesConButton() {
    for(let i = 0; i < changeConButton.length; i++) {
        changeConButton[i].classList.remove('construction__button-active');
    }
    if (this.className === ('construction__button construction__button-active')) {
        this.classList.remove('construction__button-active')
    } else {
        this.classList.add('construction__button-active');
    }
};

arrowLeft.addEventListener('click', changesWorButton);
arrowRight.addEventListener('click', changesWorButton);
function changesWorButton() {
    for(let i = 0; i < changeWorButton.length; i++) {
        changeWorButton[i].classList.remove('ourWork__buttonAct');
    }
    if (this.className === ('ourWork__button ourWork__buttonAct')) {
        this.classList.remove('ourWork__buttonAct')
    } else {
        this.classList.add('ourWork__buttonAct');
    }
};

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
            constructionBackground.style.backgroundImage = 'url("'+constructionBackgrounds[constructionIndex]+'")';
        }
    };
};
function updateNumber() {
    for (let number of constructionNumbers) {
        number.classList.remove('construction__number__active')
    }
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

function updateColumn(index) {
    workButtons.forEach(button => {
        button.classList.remove('ourWork__column-buttonAct')
    });
    workButtons[index].classList.add('ourWork__column-buttonAct');
}
workColumns.forEach((number, index) => {
    number.addEventListener('mouseover', () => {
        workIndex = index;
        updateColumn(workIndex)
    })
})

arrowLeft.addEventListener('click', prevWorkSlide);
arrowRight.addEventListener('click', nextWorkSlide);
function prevWorkSlide() {
    workSliderIndex = (--workSliderIndex + workSliderCount) % workSliderCount;
    updatePartner();
}
function nextWorkSlide() {
    workSliderIndex = (++workSliderIndex) % workSliderCount;
    updatePartner();
}
function updatePartner() {
    workSlides.forEach((slide, index) => {
    if (index === workSliderIndex) {
        slide.style.display = 'flex';
    } else {
        slide.style.display = 'none';
    }
});
}
updatePartner();

//Video
com.addEventListener('click', videoStart);
function videoStart() {
    videoHub.style.display = 'block';
    com.style.display = 'none';
    videoPlayer.play();
}
let observer = new IntersectionObserver(() => {
    if (!videoPlayer.paused) {

        videoPlayer.pause()
    } else if(videoPlayer.currentTime != 0) {
        videoPlayer.play()
    }
}, { threshold: 0.4 })
observer.observe(video)
actionButton.addEventListener('click',videoAct);
videoPlayer.addEventListener('click',videoAct);
function videoAct() {
    if(videoPlayer.paused) {
        videoHub.style.display = 'block';
        com.style.display = 'none';
        videoPlayer.play();
        actionImage.setAttribute('src', './assets/img/Arrow.svg');
        actionButton.setAttribute('class','video__hud__element video__hud__action video__hud__action_play');
    } else {
        videoPlayer.pause();

        actionImage.src = './assets/img/pause.png';
        actionButton.setAttribute('class','video__hud__element video__hud__action video__hud__action_pause');
    }
    if(durationTime.innerHTML == '00:00') {
        durationTime.innerHTML = videoTime(videoPlayer.duration);
    }
}
videoPlayer.addEventListener('timeupdate',videoProgress);
progressLine.addEventListener('click',videoChangeTime);
function videoTime(time) {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minutesVal = minutes;
    let secondsVal = seconds;
    if(minutes < 10) {
        minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
        secondsVal = '0' + seconds;
    }
    return minutesVal + ':' + secondsVal;
}
function videoProgress() {
    progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100));
    progressLine.style.width = progress + "%";
    
    currTime.innerHTML = videoTime(videoPlayer.currentTime);
}
function videoChangeTime(e) {
    let mouseX = Math.floor(e.pageX - progressLine.offsetLeft);
    let progress = mouseX / (progressLine.offsetWidth / 100);
    videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
}
