const glide = new Glide(".glide");
const captionEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    const caption = captionEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {start: 400 }),
        translateY: [anime.stagger([80, 40]), 30]
    });
});

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption >*").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

const isotope = new Isotope(".cases",{
    layoutMode: "fitRows",
    itemSelector:".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {target} = e;
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");
        
        isotope.arrange({filter:filterOption});
    }
});