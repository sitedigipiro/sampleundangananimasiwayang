/* ================= ELEMENT ================= */

const music = document.getElementById("music");
const musicBtn = document.querySelector(".music-control");

const introVideo = document.getElementById("introVideo");
const loopVideo = document.getElementById("loopVideo");
const heroLoopWrapper = document.getElementById("heroLoopWrapper");

/* ================= BUKA UNDANGAN ================= */

function bukaUndangan() {

  document.getElementById("opening").style.display = "none";
  document.getElementById("main").style.display = "block";

  /* MUSIC */
  if (music) {
    music.play();
  }

  /* PLAY INTRO */
  if (introVideo) {
    introVideo.play();
  }

  /* HIDE LOOP DULU */
  if (heroLoopWrapper) {
    heroLoopWrapper.classList.remove("show");
  }
}

/* ================= INTRO SELESAI ================= */

if (introVideo) {

  introVideo.addEventListener("ended", () => {

    /* sembunyikan intro */
    introVideo.style.display = "none";

    /* tampilkan hero looping */
    if (heroLoopWrapper) {
      heroLoopWrapper.classList.add("show");
    }

    /* play looping */
    if (loopVideo) {
      loopVideo.play();
    }

  });

}

/* ================= COUNTDOWN ================= */

document.addEventListener("DOMContentLoaded", () => {

  // ambil element
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // tanggal acara
  // format: TAHUN-BULAN-TANGGAL
  const targetDate = new Date("2026-12-28T00:00:00").getTime();

  function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    // kalau sudah lewat
    if (distance <= 0) {

      daysEl.innerHTML = "00";
      hoursEl.innerHTML = "00";
      minutesEl.innerHTML = "00";
      secondsEl.innerHTML = "00";

      return;
    }

    // hitung waktu
    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    // tampilkan
    daysEl.innerHTML = String(days).padStart(2, "0");
    hoursEl.innerHTML = String(hours).padStart(2, "0");
    minutesEl.innerHTML = String(minutes).padStart(2, "0");
    secondsEl.innerHTML = String(seconds).padStart(2, "0");

  }

  // jalankan langsung
  updateCountdown();

  // update tiap detik
  setInterval(updateCountdown, 1000);

});

/* ================= LOVE STORY ================= */

function toggleStory(el) {

  el.classList.toggle("active");

  /* LOVE ANIMATION */
  for (let i = 0; i < 5; i++) {

    const love = document.createElement("span");

    love.className = "love";
    love.innerHTML = "💖";

    love.style.left = Math.random() * 80 + "%";
    love.style.top = Math.random() * 40 + 40 + "%";

    el.appendChild(love);

    setTimeout(() => {
      love.remove();
    }, 1500);

  }

}

/* ================= SCROLL LOVE STORY ================= */

const timelineItems = document.querySelectorAll(".timeline-item");

window.addEventListener("scroll", () => {

  const trigger = window.innerHeight * 0.85;

  timelineItems.forEach((item) => {

    const top = item.getBoundingClientRect().top;

    if (top < trigger) {
      item.classList.add("show");
    }

  });

  const timeline = document.querySelector(".timeline");

  if (timeline) {

    const top = timeline.getBoundingClientRect().top;

    if (top < trigger) {
      timeline.classList.add("show");
    }

  }

});

/* ================= GALLERY SLIDER ================= */

let currentSlide = 0;

function slideGallery(direction){

  const track = document.getElementById("galleryTrack");

  const slides = track.querySelectorAll("img");

  currentSlide += direction;

  // looping
  if(currentSlide < 0){
    currentSlide = slides.length - 1;
  }

  if(currentSlide >= slides.length){
    currentSlide = 0;
  }

  track.style.transform =
    `translateX(-${currentSlide * 100}%)`;
}

/* ================= AMPLOP ================= */

function openEnvelope(el) {
  el.classList.toggle("open");
}

/* ================= COPY REKENING ================= */

function copyRek(event, id) {

  event.stopPropagation();

  const text = document.getElementById(id).innerText;

  navigator.clipboard.writeText(text);

  alert("Berhasil disalin 💕");
}

/* ================= UCAPAN ================= */

let dataUcapan =
JSON.parse(localStorage.getItem("ucapan")) || [];

function tampilkanUcapan() {

  const list = document.getElementById("list-ucapan");

  if (!list) return;

  list.innerHTML = "";

  dataUcapan.forEach(item => {

    list.innerHTML += `
      <div class="ucapan-card">
        <b>${item.nama}</b>
        <p>${item.pesan}</p>
      </div>
    `;

  });

}

function kirimUcapan() {

  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  if (!nama || !pesan) {
    alert("Isi dulu ya 💕");
    return;
  }

  dataUcapan.unshift({
    nama,
    pesan
  });

  localStorage.setItem(
    "ucapan",
    JSON.stringify(dataUcapan)
  );

  tampilkanUcapan();

  document.getElementById("nama").value = "";
  document.getElementById("pesan").value = "";

}

/* tampilkan saat load */
tampilkanUcapan();

/* ================= MUSIC CONTROL ================= */

function toggleMusic() {

  if (!music) return;

  if (music.paused) {

    music.play();

    if (musicBtn) {
      musicBtn.innerHTML = "⏸️";
    }

  } else {

    music.pause();

    if (musicBtn) {
      musicBtn.innerHTML = "▶️";
    }

  }

}