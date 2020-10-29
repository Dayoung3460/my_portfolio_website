'use strict'
//////////////////////////// home ////////////////////////////////

const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const hightlight = document.querySelector(".highlight");
const previews = document.querySelectorAll(".preview img");
const colors = ["antiquewhite", "blueviolet", "paleVioletRed", "INDIANRED", "TOMATO", "DARKKHAKI", "MEDIUMPURPLE"];
const colorChangedbtn = document.querySelector('.colorChangedbtn')
const colorName = document.querySelector('.colorName');
const descriptionContainer = document.querySelector('.description');

window.addEventListener('load', () => {
    let backColor = localStorage.getItem('backColor');
    if(descriptionContainer){
        descriptionContainer.style.backgroundColor = backColor;
        colorName.textContent = backColor;
    }   
})

function backgroundColorChanged(){
    if(colorChangedbtn){
        
        colorChangedbtn.addEventListener('click', () => {
            const randomNumber = getRandomNumber();
            descriptionContainer.style.backgroundColor = colors[randomNumber];
            colorName.textContent = colors[randomNumber];

            localStorage.setItem('backColor', colorName.textContent);
        });
    }
}

function onClickToggleBtn(){
    if(toggleBtn){
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show-sidebar')
        })
    }
}

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}

function imageGallery(){
    previews.forEach(preview => {
        preview.addEventListener('click', function() {
            const previewSrc = preview.src;
            const mainSrc = previewSrc.replace('_s', '_b');
            previews.forEach(preview => preview.classList.remove('active'));
            hightlight.src = mainSrc;
            preview.classList.add('active');

        });
    });
}

onClickToggleBtn();
backgroundColorChanged();
imageGallery();

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

const promoDesc = document.querySelector('.promoDesc');
const deadline = document.querySelector('.countDown');
const countNums = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2020, 10, 30, 23, 59, 0);

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
let weekday = futureDate.getDay();
weekday = weekdays[weekday];

if(promoDesc){
    promoDesc.textContent = `
    promotion ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}pm
  `;
}

const futureTime = futureDate.getTime();

function getRemainingTime(){
    const today = new Date().getTime();
    const time = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinutes = 60 * 1000; 

    let days = time/oneDay;
    days = Math.floor(days);
    let hours = (time % oneDay) / oneHour;
    hours = Math.floor(hours);
    let mins = (time % oneHour) / oneMinutes;
    mins = Math.floor(mins);
    let secs = (time % oneMinutes) / 1000;
    secs = Math.floor(secs);

    const values = [days, hours, mins, secs];

    function format(countNum) {
        if(countNum < 10) {
            return countNum = `0${countNum}`;
        }
        return countNum;
    }

    countNums.forEach((countNum, index) => {
        countNum.textContent = format(values[index]);
    });

    if(time < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `
            <h4 class='expired'>Sorry, this promotion has expired.</h4>
        `;
    }
}

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();

// ////////////////////////////review page////////////////////////////////

const reviewImg = document.getElementById('person-img');
const reviewAuthor = document.getElementById('author');
const reviewInfo = document.getElementById('info');

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentItem = 0;

function loadReviews(){
    return fetch('data/review.json')
    .then(response => response.json()) 
    .then(json => json.reviews); 
}

window.addEventListener('DOMContentLoaded', displayItems);

function displayItems(reviews){
    if(reviewImg){
        const review = reviews[currentItem];
        reviewImg.src = review.image;
        reviewAuthor.textContent = review.name;
        reviewInfo.textContent = review.text;
    }
}

loadReviews()
.then(reviews => {
    displayItems(reviews);

    if(rightBtn){
        rightBtn.addEventListener('click', () => {
            reviewImg.style.transform = 'translateY(33px)';
            reviewImg.style.transition = 'all 3s';
            currentItem++;
            if(currentItem < reviews.length){
                displayItems(reviews);
            } else {
                currentItem = 0;
                displayItems(reviews);
            }
        });
    }
    
    if(leftBtn){
        leftBtn.addEventListener('click', () => {
            currentItem--;
            if(currentItem > -1){
                displayItems(reviews);
            } else {
                currentItem = reviews.length-1;
                displayItems(reviews);
            }
        });
    }

})
.catch(console.log);

// ////////////////////////////faq page////////////////////////////////


const dropDownBtns = document.querySelectorAll('.title button');

dropDownBtns.forEach((dropDownBtn) => {
    dropDownBtn.addEventListener('click', (e) => {
        const question = e.currentTarget.parentElement.parentElement;
        
        question.children[1].classList.toggle('show-hr');
        question.children[2].classList.toggle("show-p");
    })
})

//////////////////////////// about ////////////////////////////////

const descCon = document.querySelector('.desc');
const tabBtns = document.querySelectorAll('.tabDiv button');
const aboutContents = document.querySelectorAll('.para .content');

if(descCon) {
    descCon.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
    
        if(id) {
            tabBtns.forEach(tabBtn => {
                tabBtn.classList.remove('active');
                e.target.classList.add('active');
            })
            aboutContents.forEach(aboutContent => {
                aboutContent.classList.remove('active');
            })
            const elemContent = document.getElementById(id);
            elemContent.classList.add('active');
        }
    })
    
}

const preloader = document.querySelector('.preloader');

if(preloader){
    window.addEventListener('load', () => {
        preloader.classList.add('hide-preloader');
    })
}


