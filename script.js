// ===== DOT IMAGE ANIMATION =====
const canvas = document.getElementById("dotcanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

const particles = [];
const image = new Image();
image.src = "photo.jpeg";

let mouse = { x: null, y: null };

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {

            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            const brightness = (r + g + b) / 3;

            if (brightness < 200) {
                particles.push({
                    // 🔥 START RANDOM (animation entry)
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,

                    // final position
                    baseX: x,
                    baseY: y,

                    size: 1.5,

                    // optional delay (nice effect)
                    delay: Math.random() * 50
                });
            }
        }
    }

    animate();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        // delay effect
        if (p.delay > 0) {
            p.delay--;
            return;
        }

        // mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
            let dx = p.x - mouse.x;
            let dy = p.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
                let force = (80 - distance) / 80;
                p.x += dx * force * 0.2;
                p.y += dy * force * 0.2;
            }
        }

        // 🔥 SMOOTH MOVE TO SHAPE
        p.x += (p.baseX - p.x) * 0.08;
        p.y += (p.baseY - p.y) * 0.08;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#3dd5c0";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

// ===== SLIDER =====
document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelector(".slides");
    const allSlides = document.querySelectorAll(".slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const sliderDots = document.querySelectorAll(".dot");

    let index = 0;
    let autoSlide; // ✅ added

    function showSlide(i) {
        slides.style.transform = `translateX(-${i * 100}%)`;

        sliderDots.forEach(dot => dot.classList.remove("active"));
        sliderDots[i].classList.add("active");
    }

    // ✅ AUTO SLIDE FUNCTION
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            index = (index + 1) % allSlides.length;
            showSlide(index);
        }, 4000);
    }

    // ✅ RESET AFTER CLICK
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    next.addEventListener("click", () => {
        index = (index + 1) % allSlides.length;
        showSlide(index);
        resetAutoSlide(); // ✅ important
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + allSlides.length) % allSlides.length;
        showSlide(index);
        resetAutoSlide(); // ✅ important
    });

    sliderDots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
            resetAutoSlide(); // ✅ important
        });
    });

    // 🔥 THIS LINE WAS MISSING
    startAutoSlide();

});

// ===== TYPING EFFECT =====
document.addEventListener("DOMContentLoaded", () => {

    const before = "hi, ";
    const name = "abdul jabbar";
    const after = " here.";

    const beforeEl = document.getElementById("text-before");
    const nameEl = document.getElementById("text-name");
    const afterEl = document.getElementById("text-after");

    let i = 0;

    function typeBefore() {
        if (i < before.length) {
            beforeEl.innerHTML += before[i];
            i++;
            setTimeout(typeBefore, 50);
        } else {
            i = 0;
            setTimeout(typeName, 200);
        }
    }

    function typeName() {
        if (i < name.length) {
            nameEl.innerHTML += name[i];
            i++;
            setTimeout(typeName, 70);
        } else {
            i = 0;
            setTimeout(typeAfter, 200);
        }
    }

    function typeAfter() {
        if (i < after.length) {
            afterEl.innerHTML += after[i];
            i++;
            setTimeout(typeAfter, 50);
        }
    }

    typeBefore();
});