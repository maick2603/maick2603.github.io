const _noise = noise;
_noise.seed(Math.random() * 100);
const anim = { t: 0 };
let ctx;
console.clear();

/* ====== STEP 1 ====== */
function goToStep1() {
    noLoop();
    fill(255);
}

function step1() {
    clear();
    const r = min(width, height) * 0.35;
    for (let i = 0; i < 100; i++) {
        const x = cos(i / 100 * TWO_PI) * r + width / 2;
        const y = sin(i / 100 * TWO_PI) * r + height / 2;
        circle(x, y, 5);
    }
}

/* ====== STEP 2 ====== */
function goToStep2() {
    loop();
    fill(255);
    noStroke();
    gsap.fromTo(anim, {
        t: 0
    }, {
        t: 1,
        duration: 3,
        ease: 'power2.out'
    });
}

function step2() {
    clear();
    const r = min(width, height) * 0.35;
    for (let i = 0; i < 100; i++) {
        let x = cos(i / 100 * TWO_PI);
        let y = sin(i / 100 * TWO_PI);
        const offset = _noise.simplex3(x, y, 0) * (r / 5) * anim.t;
        x *= r + offset;
        y *= r + offset;
        x += width / 2;
        y += height / 2;
        circle(x, y, 5);
    }
}

/* ====== STEP 3 ====== */
function goToStep3() {
    loop();
    noFill();
    gsap.fromTo(anim, {
        t: 0
    }, {
        t: 1,
        duration: 3,
        ease: 'none'
    });
}

function step3() {
    clear();
    const r = min(width, height) * 0.35;
    beginShape();
    for (let i = 0; i <= 100; i++) {
        let x = cos(i / 100 * TWO_PI);
        let y = sin(i / 100 * TWO_PI);
        const offset = _noise.simplex3(x, y, 0) * (r / 5);
        x *= r + offset;
        y *= r + offset;
        x += width / 2;
        y += height / 2;
        if (anim.t >= (i / 100)) {
            vertex(x, y);
        }
        fill(255);
        noStroke();
        circle(x, y, 5 * (1 - anim.t));
    }
    stroke(255);
    noFill();
    endShape();
}

/* ====== STEP 4 ====== */
function goToStep4() {
    loop();
    stroke(255);
    fill(0);
    gsap.fromTo(anim, {
        t: 0
    }, {
        t: 1,
        duration: 3,
        ease: 'none'
    });
}

function step4() {
    clear();
    let r = min(width, height) * 0.35;
    const rings = 70;
    for (let j = 0; j <= (rings * anim.t); j++) {
        let rad = (r / rings) * (rings - j);
        beginShape();
        for (let i = 0; i <= 100; i++) {
            let x = cos(i / 100 * TWO_PI);
            let y = sin(i / 100 * TWO_PI);
            const offset = _noise.simplex3(x, y + (j * 0.03), 0) * (rad / 5);
            x *= rad + offset;
            y *= rad + offset;
            x += width / 2;
            y += height / 2;
            vertex(x, y);
        }
        endShape();
    }
}

/* ====== STEP 5 ====== */
function goToStep5() {
    loop();
    stroke(255);
    noFill();
    gsap.fromTo(anim, {
        t: 0
    }, {
        t: 1,
        duration: 3,
        ease: 'none'
    });
}

function step5() {
    clear();
    let r = min(width, height) * 0.35;
    const rings = 70;
    for (let j = 0; j < rings; j++) {
        let rad = (r / rings) * (rings - j);
        beginShape();
        for (let i = 0; i <= 100; i++) {
            let x = cos(i / 100 * TWO_PI);
            let y = sin(i / 100 * TWO_PI);
            const offset = _noise.simplex3(x, y + (j * 0.03), 0) * (rad / 5);
            x *= rad + offset;
            y *= rad + offset;
            x += width / 2;
            y += height / 2;
            vertex(x, y);
        }
        stroke(j / rings * 175 + 80);
        endShape();
    }
}

/* ====== STEP 6 ====== */
let frames = 0;

function goToStep6() {
    loop();
    ctx.fillStyle = 'black';
    frames = 0;
}

function step6() {
    clear();
    let r = min(width, height) * 0.35;
    const rings = 70;
    for (let j = 0; j < rings; j++) {
        let rad = (r / rings) * (rings - j);
        beginShape();
        for (let i = 0; i <= 100; i++) {
            let x = cos(i / 100 * TWO_PI);
            let y = sin(i / 100 * TWO_PI);
            const offset = _noise.simplex3(x, y + (j * 0.03), frames * 0.003) * (rad / 5);
            x *= rad + offset;
            y *= rad + offset;
            x += width / 2;
            y += height / 2;
            vertex(x, y);
        }
        stroke(j / rings * 175 + 80);
        endShape();
    }
    frames++;
}

/* ====== STEP 7 ====== */
function goToStep7() {
    loop();
}

function step7() {
    clear();
    let r = min(width, height) * 0.35;
    const rings = 40;
    for (let j = 0; j < rings; j++) {
        let rad = (r / rings) * (rings - j);
        ctx.beginPath();
        for (let i = 0; i <= 150; i++) {
            let x = cos(i / 100 * TWO_PI);
            let y = sin(i / 100 * TWO_PI);
            const offset = _noise.simplex3(x, y + (j * 0.03), frames * 0.003) * (rad / 3);
            x *= rad + offset;
            y *= rad + offset;
            x += width / 2;
            y += height / 2;
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = `hsl(${j/rings * 360}, 70%, 70%)`;
        ctx.strokeStyle = `hsl(${j/rings * 360}, 70%, 80%)`;
        ctx.fill();
        ctx.stroke();
    }
    frames++;
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    ctx = canvas.drawingContext;

    windowResized();
    document.querySelector('#step').addEventListener('input', () => {
        if (window['goToStep' + step.value]) {
            window['goToStep' + step.value]();
        }
        draw();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if (window['goToStep' + step.value]) {
        window['goToStep' + step.value]();
    }
    draw();
}

const texts = document.querySelectorAll('section p');

function draw() {
    window['step' + step.value]();

    texts.forEach(text => text.style.display = 'none');
    texts[step.value - 1].style.display = 'block';
}