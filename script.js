// --- 1. VARIABEL GLOBAL ---
let currentUser = "Guest"; 
let currentBtn = null; 
const audioPlayer = new Audio(); 
let slideIndex = 1; 

// --- 2. FUNGSI NAVIGASI (GABUNGAN SEMUA LOGIK KAU) ---
function showPage(pageId) {
    // Sembunyikan semua page
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    // Tunjukkan page yang diklik
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        
        // Logik Flex untuk Creators, yang lain Block
        if (pageId === 'meet-creators') {
            target.style.display = 'flex';
        } else {
            target.style.display = 'block';
        }
    }

    // Logik Video Background (Horror vs Normal)
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        if (pageId === 'genre-horror') {
            bgVideo.style.display = 'none'; 
            document.body.style.backgroundColor = '#0a0000';
        } else {
            bgVideo.style.display = 'block'; 
            document.body.style.backgroundColor = ''; 
        }
    }

    // Logik Slideshow Creators
    if (pageId === 'creators-page' || pageId === 'meet-creators') {
        showSlides(slideIndex = 1);
    }

    window.scrollTo(0, 0);
}

// --- 3. LOGIN ---
function doLogin() {
    const userInput = document.getElementById('username');
    const bgVideo = document.getElementById('bgVideo'); 
    const videoSource = document.getElementById('videoSource'); 
    
    if (!userInput) return;
    const name = userInput.value.trim();

    if (name !== "") {
        currentUser = name; 
        if (bgVideo && videoSource) {
            videoSource.src = "background.mp4"; 
            bgVideo.load();
            bgVideo.play().catch(e => console.log("Video play failed"));
        }
        // Tunjukkan main content dan sorok login
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        showPage('homepage');
    } else {
        alert("Sila masukkan Username!");
    }
}

// --- 4. SLIDESHOW CREATORS ---
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let videos = document.getElementsByClassName("creator-vid");

    if (slides.length === 0) return; 

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (videos[i]) { videos[i].pause(); }
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        if (videos[slideIndex - 1]) { videos[slideIndex - 1].play(); }
    }
}

// --- 5. AUDIO PLAYER ---
function playAudio(file, btn) {
    if (currentBtn === btn) {
        if (audioPlayer.paused) {
            audioPlayer.play();
            btn.innerText = "⏸ PAUSE";
        } else {
            audioPlayer.pause();
            btn.innerText = "▶ PLAY";
        }
        return;
    }
    if (currentBtn) { currentBtn.innerText = "▶ PLAY"; }
    audioPlayer.src = file;
    audioPlayer.play();
    currentBtn = btn;
    btn.innerText = "⏸ PAUSE";
    audioPlayer.onended = () => { btn.innerText = "▶ PLAY"; currentBtn = null; };
}

// --- 6. MOVIE & DETAIL ---
function openMovie(title, poster) {
    showPage('detail-page');
    
    const titleElem = document.getElementById('m-title');
    const imgElem = document.getElementById('movie-img');
    const placeholderElem = document.getElementById('poster-placeholder');
    const synopsisElem = document.getElementById('m-synopsis');

    if (titleElem) titleElem.innerText = title;
    if (imgElem) {
        imgElem.src = poster;
        imgElem.style.display = 'block';
    }
    if (placeholderElem) placeholderElem.style.display = 'none';

    let synopsisText = "";
    let checkTitle = title.toLowerCase().trim();

    if (checkTitle.includes('avatar')) {
        synopsisText = `Jake and Neytiri's family grapples with grief, encountering a new, aggressive Na'vi tribe, the Ash People, who are led by the fiery Varang, as the conflict on Pandora escalates and a new moral focus emerges.`;
    } else if (checkTitle.includes('papa zola')) {
        synopsisText = "Papa Zola, a schoolteacher, and his gifted daughter Pipi go on small adventures that often escalate. Their escapades showcase their loving relationship and Pipi's intelligence, as they navigate whimsical situations together.";
    } else if (checkTitle.includes('zootopia')) {
        synopsisText = "Brave rabbit cop Judy Hopps and her friend, the fox Nick Wilde, team up again to crack a new case, the most perilous and intricate of their careers.";
    } else if (checkTitle.includes('conjuring')) {
        synopsisText = "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.";
    } else if (checkTitle.includes('evil dead')) {
        synopsisText = "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.";
    } else if (checkTitle.includes('talk to me')) {
        synopsisText = "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.";
    } else if (checkTitle.includes('texas chainsaw')) {
        synopsisText = "Influencers looking to breathe new life into a Texas ghost town encounter Leatherface, an infamous killer who wears a mask of human skin.";
    } else if (checkTitle.includes('dollhouse')) {
        synopsisText = "When her 5-year-old daughter dies, a mother is devastated but finds solace in a doll that looks like her daughter and begins to treat the toy as part of the family. But after giving birth to another child, strange things begin to happen.";
    } else {
        synopsisText = "Synopsis not available for this movie.";
    }

    if (synopsisElem) {
        synopsisElem.innerText = synopsisText;
    }
} 

// --- 7. INFINITE SLIDER LOGIC ---
function moveInfinite(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const items = slider.querySelectorAll('.slider-item');
    if (items.length === 0) return;
    const cardWidth = items[0].offsetWidth + 15; 

    if (direction === 1) {
        slider.style.transition = "transform 0.4s ease-in-out";
        slider.style.transform = `translateX(-${cardWidth}px)`;
        setTimeout(() => {
            slider.style.transition = "none"; 
            slider.appendChild(items[0]); 
            slider.style.transform = "translateX(0)"; 
        }, 400);
    } else {
        slider.style.transition = "none";
        slider.prepend(items[items.length - 1]); 
        slider.style.transform = `translateX(-${cardWidth}px)`;
        setTimeout(() => {
            slider.style.transition = "transform 0.4s ease-in-out";
            slider.style.transform = "translateX(0)";
        }, 10);
    }
}

// --- 8. UTILITIES ---
function goWiki(name) {
    window.open(`https://id.wikipedia.org/wiki/${name.replace(' ', '_')}`, '_blank');
}

document.addEventListener('keydown', function(event) {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const slider = activePage.querySelector('.movie-slider');
        if (slider) {
            if (event.key === "ArrowRight") moveInfinite(slider.id, 1);
            else if (event.key === "ArrowLeft") moveInfinite(slider.id, -1);
        }
    }
});

// --- 9. SISTEM KOMEN & REVIEW ---
function hantarKomen() {
    const inputKomen = document.getElementById('comment-input') || document.getElementById('commentInput');
    const senaraiKomen = document.getElementById('comment-list') || document.getElementById('comments-list');

    if (!inputKomen || !senaraiKomen) return;

    const teksKomen = inputKomen.value.trim();

    if (teksKomen === "") {
        alert("Please write a comment first!");
        return;
    }

    const divKomen = document.createElement('div');
    divKomen.innerHTML = `
        <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin-bottom: 12px; border-left: 5px solid #ff0000; color: white; text-align: left; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <strong style="color: #ff0000; font-size: 1.1em;">${currentUser}</strong>
            <p style="margin: 8px 0; line-height: 1.4; color: #eee;">${teksKomen}</p>
            <small style="color: #666; font-size: 0.8em;">Just now</small>
        </div>
    `;

    senaraiKomen.prepend(divKomen);
    inputKomen.value = "";
}

function addComment() {
    hantarKomen();
}

// --- 10. POSTER CLICK FOR TRAILER ---
document.querySelectorAll('.poster-img').forEach(poster => {
    poster.onclick = function() {
        const container = this.parentElement;
        const video = container.querySelector('.trailer-video');
        if (video) {
            video.classList.add('playing'); 
            this.style.display = 'none'; 
            video.play();
        }
    };
});