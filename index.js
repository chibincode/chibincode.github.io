const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset > 500) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }
    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});
const glide = new Glide(".glide");
const captionEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    const caption = captionEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {
            start: 400
        }),
        translateY: [anime.stagger([80, 40]), 30]
    });
});

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption >*").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {
        target
    } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({
            filter: filterOption
        });
    }
});


// 逐渐出现的动画
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", {
    ...staggeringOption,
    interval: 300
});
ScrollReveal().reveal(".service-item", {
    ...staggeringOption,
    interval: 300
});
const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 3000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 3}px)`;
    }
});


window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(10% - ${bottom / 3}px)`;
    }
});

//滑动效果
const scroll = new SmoothScroll('nav a[href*= "#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset: 80
});

document.addEventListener("scrollStart",()=>{
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    }
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});
// 折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
});

