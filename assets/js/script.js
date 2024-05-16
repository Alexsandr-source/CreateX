let slider = document.querySelector('.ourWork__container-slider'),
  sliderList = slider.querySelector('.ourWork__slider'),
  sliderTrack = slider.querySelector('.ourWork__slider-track'),
  slides = slider.querySelectorAll('.ourWork__column'),
  arrows = document.querySelector('.ourWork__buttons'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = (--slides.length) * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  getEvent = function(evt) {
    return (evt.type.search('touch') !== -1) ? evt.touches[0] : evt;
},
slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === (--slides.length));
},
swipeStart = function(evt) {
    let e = getEvent(evt);

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = e.clientX;
      posY1 = e.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
},
swipeAction = function(evt) {
    let e = getEvent(evt),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;

    posY2 = posY1 - e.clientY;
    posY1 = e.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = evt.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});





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
durationTime = document.getElementById('video-hud__duration'),
actionButton = document.getElementById('video-hud__action'),
actionImage = document.querySelector('.video__hud__action_img'),
lineVideo = document.querySelector('.video__hud__progress_line'),
workButtons = document.querySelectorAll('.ourWork__column-button'),
constructionNumbers = Array.from(constructionNumber.querySelectorAll('.construction__number')),
scrollToTop = document.querySelector('#scrollToTop'),
constructionBackgrounds = [
    "assets/img/bg-image0.png",
    "assets/img/bg-image1.png",
    "assets/img/bg-image2.png",
    "assets/img/bg-image3.png",
];

let constructionCount = constructionBackgrounds.length,
constructionIndex = 0,
workIndex = 0;

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

/* workButton */

// prev.addEventListener('click', changesWorButton);
// next.addEventListener('click', changesWorButton);
// function changesWorButton() {
//     for(let i = 0; i < changeWorButton.length; i++) {
//         changeWorButton[i].classList.remove('ourWork__buttonAct');
//     }
//     if (this.className === ('ourWork__button ourWork__buttonAct')) {
//         this.classList.remove('ourWork__buttonAct')
//     } else {
//         this.classList.add('ourWork__buttonAct');
//     }
// };

// prev.addEventListener('click', prevWorkSlide);
// next.addEventListener('click', nextWorkSlide);
// function prevWorkSlide() {
//     slideIndex = (--slideIndex + workSliderCount) % workSliderCount;
//     updatePartner();
// }
// function nextWorkSlide() {
//     slideIndex = (++slideIndex) % workSliderCount;
//     updatePartner();
// }

// function updatePartner() {
//     slides.forEach((slide, index) => {
//     if (index === slideIndex) {
//         slide.style.display = 'flex';
//     } else {
//         slide.style.display = 'none';
//     }
// });
// }
// updatePartner();




/* sliderColumn */

slides.forEach((number, index) => {
    number.addEventListener('mouseover', () => {
        workIndex = index;
        updateColumn(workIndex)
    })
})

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

scrollToTop.addEventListener('click', goToTop);
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}