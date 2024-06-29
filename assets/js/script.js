// Touch events for swipe functionality
const
changeConButton = document.querySelectorAll('.construction__button'),
changeWorButton = document.querySelectorAll('.ourWork__button'),
learnMore = document.querySelector('#learnMore'),
submitRequest = document.querySelector('#submitRequest'),
constructionPrev = document.querySelector('#constructionPrev'),
constructionNext = document.querySelector('#constructionNext'),
constructionBackground = document.querySelector('.construction'),
constructionNumber = document.querySelector('#constructionNumber'),
com = document.querySelector('.com'),
videoHub = document.querySelector('.video__hud'),
video = document.querySelector('.video'),
videoPlayer = document.getElementById('video-player'),
progressLine = document.getElementById('video-hud__progress-line'),
currTime = document.getElementById('video-hud__curr-time'),
slider = document.querySelector('.ourWork__slider-track'),
durationTime = document.getElementById('video-hud__duration'),
actionButton = document.getElementById('video-hud__action'),
actionImage = document.querySelector('.video__hud__action_img'),
lineVideo = document.querySelector('.video__hud__progress_line'),
workButtonPrev = document.querySelector('#workButtonPrev'),
workButtonNext = document.querySelector('#workButtonNext'),
workButtons = document.querySelectorAll('.ourWork__column-button'),
workColumns = document.querySelectorAll('.ourWork__column'),
constructionNumbers = Array.from(constructionNumber.querySelectorAll('.construction__number')),
scrollToTop = document.querySelector('#scrollToTop'),
constructionBackgrounds = [
    "assets/img/bg-image0.png",
    "assets/img/bg-image1.png",
    "assets/img/bg-image2.png",
    "assets/img/bg-image3.png",
],
totalSlides = document.querySelectorAll('.ourWork__column').length,
slideWidth = document.querySelector('.ourWork__column').offsetWidth + 70,
slidesToShow = 3;

let constructionCount = constructionBackgrounds.length,
activeColumn = null,
constructionIndex = 0,
workIndex = 0;
ourWorkSlide = 0,
touchStartX = 0,
touchEndX = 0,

/* changesConButton */
/* Исправить */
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

/* construction */
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

/* Video */
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

/* Out work */
const valueToWorkButton = {
    'buttonAct': 'ourWork__buttonAct',
    'buttNotAct': 'ourWork__button'
}
workButtonPrev.addEventListener('click', function() {
    workButtonPrev.className = ''; // очищаем все классы
    workButtonPrev.classList.add(valueToWorkButton['buttonAct']);
    workButtonNext.classList.remove(valueToWorkButton['buttonAct']);
    workButtonNext.classList.add(valueToWorkButton['buttNotAct']);

    if (ourWorkSlide > 0) {
        ourWorkSlide--;
    } else {
        ourWorkSlide = totalSlides - slidesToShow;
    }
    updateSlider();
});
workButtonNext.addEventListener('click', function() {
    workButtonNext.className = ''; // очищаем все классы
    workButtonNext.classList.add(valueToWorkButton['buttonAct']);
    workButtonPrev.classList.remove(valueToWorkButton['buttonAct']);
    workButtonPrev.classList.add(valueToWorkButton['buttNotAct']);

    if (ourWorkSlide < totalSlides - slidesToShow) {
        ourWorkSlide++;
    } else {
        ourWorkSlide = 0;
    }
    updateSlider();
});
slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
function prevSlide() {
    if (ourWorkSlide > 0) {
        ourWorkSlide--;
    } else {
        ourWorkSlide = totalSlides - slidesToShow;
    }
    updateSlider();
}
function nextSlide() {
    if (ourWorkSlide < totalSlides - slidesToShow) {
        ourWorkSlide++;
    } else {
        ourWorkSlide = 0;
    }
    updateSlider();
}
function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}
function updateSlider() {
    const offset = -ourWorkSlide * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
}
updateSlider();


workColumns.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!activeColumn || activeColumn !== card) {
            card.querySelector('.ourWork__column-button').style.display = 'block';
        }
    });
    card.addEventListener('mouseleave', () => {
        if (!activeColumn || activeColumn !== card) {
            card.querySelector('.ourWork__column-button').style.display = 'none';
        }
    });
    card.addEventListener('click', () => {
        if (activeColumn && activeColumn !== card) {
            activeColumn.classList.remove('active');
            activeColumn.querySelector('.ourWork__column-button').style.display = 'none';
        }
        card.classList.add('ourWork__column-buttonActive');
        activeColumn = card;
    });
});
document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.ourWork__column')) {
        if (activeColumn) {
            activeColumn.classList.remove('ourWork__column-buttonActive');
            activeColumn.querySelector('.ourWork__column-button').style.display = 'none';
            activeColumn = null;
        }
    }
});

/* Go to Top */
scrollToTop.addEventListener('click', goToTop);
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}