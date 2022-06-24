let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let durationTime = document.querySelector('.duration');
let remainingTime = document.querySelector('.remaining');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

// Create a audio element 
let track = document.createElement('audio'); 

displayTimer();
let time;

// All song lists 
let All_song = [
    {
        name: "Pretty Savage",
        path: "./assets/mv/song1.mp4",
        img: "./assets/img/music/prettysavage.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Love To Hate Me",
        path: "./assets/mv/song2.mp4",
        img: "./assets/img/music/lovetohateme.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "REALLY",
        path: "./assets/mv/song3.mp4",
        img: "./assets/img/music/really.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "See You Later",
        path: "./assets/mv/song4.mp4",
        img: "./assets/img/music/seeyoulater.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "You Never Know",
        path: "./assets/mv/song5.mp4",
        img: "./assets/img/music/youneverknow.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Don't know what to do",
        path: "./assets/mv/song6.mp4",
        img: "./assets/img/music/what.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Forever Young",
        path: "./assets/mv/song7.mp4",
        img: "./assets/img/music/foreveryoung.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Hope Not",
        path: "./assets/mv/song8.mp4",
        img: "./assets/img/music/hopenot.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Kick It",
        path: "./assets/mv/song9.mp4",
        img: "./assets/img/music/kickit.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Bet You Wanna",
        path: "./assets/mv/song10.mp4",
        img: "./assets/img/music/gone.jpg", 
        singer: "BLACKPINK f. Cardi B"
    },
    {
        name: "Crazy Over You",
        path: "./assets/mv/song11.mp4",
        img: "./assets/img/music/crazyoveryou.jpg", 
        singer: "BLACKPINK"
    },
    {
        name: "Kiss and Make Up",
        path: "./assets/mv/song12.mp4",
        img: "./assets/img/music/money.jpg", 
        singer: "BLACKPINK f. Dua Lipa"
    },
    {
        name: "Sour Candy",
        path: "./assets/mv/song13.mp4",
        img: "./assets/img/music/sourcandy.jpg", 
        singer: "BLACKPINK f. Lady Gaga"
    }
];

// All function 

// Function load the track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name; 
    track_image.src= All_song[index_no].img; 
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider, 1000);
}
load_track(index_no);


// mute sound 
function mute_sound() {
    track.volume = 0; 
    volume.value = 0; 
    volume_show.innerHTML = 0;
}

// Reset song slider 
function reset_slider () {
    slider.value = 0; 
}

// Checking the song is playing or not 
function justplay () {
    if(playing_song==false) {
        playsong();
    } else {
        pausesong();
    }
}

// Play song
function playsong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="play controls_icon fa-solid fa-pause"></i>';
    time = setInterval(displayTimer, 500);
}

// Pause song 
function pausesong() {
    track.pause();
    playing_song = false; 
    play.innerHTML = '<i class="play controls_icon fa-solid fa-play"></i>';
    clearInterval(time);
}

// next song
function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0; 
        load_track(index_no);
        playsong(); 
    }
}

// Previous song 
function previous_song() {
    if (index_no > 0) {
        index_no -= 1; 
        load_track(index_no);
        playsong();
    } else {
        index_no = All_song.length; 
        load_track(index_no); 
        playsong();
    }
}

// Change volume 
function volume_change() {
    volume_show.innerHTML = recent_volume.value; 
    track.volume = recent_volume.value / 100; 
}

// Change slider position
// function change_duration() {
//     slider_position = track.duration * (slider.value / 100);
//     track.currentTime = slider_position; 
// }

slider.addEventListener("change", change_duration)
function change_duration () {
    track.currentTime = slider.value;
}

// Autoplay function
function autoplay_switch () {
    if (autoplay==1) {
        autoplay=0; 
        auto_play.style.background = "rgba(255, 255, 255, 0.2)"; 
    } else {
        autoplay = 1; 
        auto_play.style.background = "#fff";
    }
}

function range_slider () {
    let position = 0; 

    // Update slider postion
    // if (!isNaN(track.duration)) {
    //     position = track.currentTime * (100 / track.duration); 
    //     slider.value = position; 
    // }


// Function will run when the song is over
    if (track.ended) {
        play.innerHTML = '<i class="play controls_icon fa-solid fa-play"></i>';
        if (autoplay==1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        } else {
            track.pause();
            playing_song = false; 
            play.innerHTML = '<i class="play controls_icon fa-solid fa-play"></i>';
            clearInterval(time);
        }
    }
}

// Timer
function displayTimer () {
    const {duration, currentTime} = track;
    slider.max = duration;
    slider.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer (number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60); 
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function changeSlider () {

    const images = [
        'url("assets/img/slider/slider1.jpg")',
        'url("assets/img/slider/slider3.jpg")',
        'url("assets/img/slider/slider4.jpg")',
        'url("assets/img/slider/slider5.jpg")'
    ];

    var imgLength = images.length; 

    const slider = document.querySelector('.slider')
    const img = images[Math.floor(Math.random() * 
    imgLength)]; 
    slider.style.backgroundImage = img;
}

setInterval(changeSlider, 1500);
