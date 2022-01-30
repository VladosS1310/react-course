'use strict'
const getInformationSlider = async () => {
    const response = await fetch("https://boring-fe.herokuapp.com/advertisments");

    return response.json();
}

function createSlider (id, arr) {
    const slides = [];

    const sliderDiv = document.createElement("div");
    const slidesDiv = document.createElement("div");
    const sliderFooter = document.createElement("div");
    const sliderFooterBtnFirst = document.createElement("button");
    const sliderFooterBtnPrev = document.createElement("button");
    const sliderFooterBtnNext = document.createElement("button");
    const sliderFooterBtnLast = document.createElement("button");

    sliderDiv.classList.add("slider");
    slidesDiv.classList.add("slides");
    sliderFooter.classList.add("slider_footer");

    id.appendChild(sliderDiv);
    sliderDiv.appendChild(slidesDiv);
    sliderDiv.appendChild(sliderFooter);
    sliderFooter.appendChild(sliderFooterBtnFirst);
    sliderFooter.appendChild(sliderFooterBtnPrev);
    sliderFooter.appendChild(sliderFooterBtnNext);
    sliderFooter.appendChild(sliderFooterBtnLast);

    sliderFooterBtnFirst.innerText = "<<<";
    sliderFooterBtnPrev.innerText = "<";
    sliderFooterBtnNext.innerText = ">";
    sliderFooterBtnLast.innerText = ">>>";

    arr.forEach((k, i) => {
        const slideDiv = document.createElement("div");
        const slideThumbnail = document.createElement("div");
        const image = document.createElement("img");
        const slideContent = document.createElement("div");
        const titleDiv = document.createElement("div");
        const p = document.createElement("p");
        const segment = document.createElement("span");
        const slideFooter = document.createElement("div");
        const slideBtn = document.createElement("button");

        slideDiv.classList.add("slide");
        slideThumbnail.classList.add("slide_thumbnail");
        slideContent.classList.add("slide_content");
        titleDiv.classList.add("title");
        segment.classList.add("segment");
        slideFooter.classList.add("slide_footer");
        slideBtn.classList.add("slide_btn");

        slideDiv.setAttribute("style", `transform: translate(${-i * 100}%)`);
        slideDiv.setAttribute("id", k.id);
        titleDiv.innerText = k.title;
        p.innerText = `${k.description.slice(0, 50)}...`;
        segment.innerText = k.description.slice(50);
        slideBtn.innerText = "Toggle";

        image.setAttribute("src", `https://boring-fe.herokuapp.com/${k.img}`);

        slidesDiv.appendChild(slideDiv);
        slideDiv.appendChild(slideThumbnail);
        slideThumbnail.appendChild(image);
        slideDiv.appendChild(slideContent);
        slideContent.appendChild(titleDiv);
        slideContent.appendChild(p);
        p.appendChild(segment);
        slideDiv.appendChild(slideFooter);
        slideFooter.appendChild(slideBtn);

        if (i === 0) {
            slideDiv.classList.add("active");
        }

        slides.push(slideDiv);
    })
    return { sliderFooterBtnFirst, sliderFooterBtnPrev, sliderFooterBtnNext, sliderFooterBtnLast, slides };
}

getInformationSlider()
    .then( res => {
        if (res.length === 0) {
            alert("Request is empty!!!")
        } else {
            new Slider(document.querySelector("#App-wrapper"), res);
        }
    })
    .catch(r => {
        console.log(r);
    });

class Slider {
    constructor(id, arr) {
        const {
            sliderFooterBtnFirst,
            sliderFooterBtnPrev,
            sliderFooterBtnNext,
            sliderFooterBtnLast,
            slides
        } = createSlider(id, arr);

        this.slides = slides;

        let toggleBtn = document.querySelector(".slide_btn");

        toggleBtn.addEventListener("click", (e) => this.toggle(e));
        sliderFooterBtnFirst.addEventListener("click", () => this.firstSlide());
        sliderFooterBtnPrev.addEventListener("click", () => this.prevSlide());
        sliderFooterBtnNext.addEventListener("click", () => this.nextSlide());
        sliderFooterBtnLast.addEventListener("click", () => this.lastSlide());
    }

    toggle (e) {
        if (e.target.parentElement.parentElement.classList.contains("expand")) {
            e.target.parentElement.parentElement.classList.remove("expand");
            const p = e.target.parentElement.previousSibling.lastChild;
            p.firstChild.textContent = `${p.innerHTML.slice(0, 50)}...`;
        } else {
            e.target.parentElement.parentElement.classList.add("expand");
            const p = e.target.parentElement.previousSibling.lastChild;
            p.firstChild.textContent = p.innerHTML.split("...")[0];
        }
    }

    lastSlide () {
        this.clearActiveClass();
        this.slides[this.slides.length - 1].classList.add("active");
    }

    prevSlide() {
        const foundActiveSlide = this.slides.filter((s) => s.classList.contains("active"))[0];
        if (foundActiveSlide.previousSibling) {
            this.clearActiveClass();
            foundActiveSlide.previousSibling.classList.add("active");
        } else {
            this.clearActiveClass();
            this.slides[this.slides.length - 1].classList.add("active");
        }
    }

    clearActiveClass () {
        this.slides.forEach((s) => {
            s.classList.remove("active");
        })
    }

    firstSlide () {
        this.clearActiveClass();
        this.slides[0].classList.add("active");
    }

    nextSlide() {
        const foundActiveSlide = this.slides.filter((s) => s.classList.contains("active"))[0];
        if (foundActiveSlide.nextSibling) {
            this.clearActiveClass();
            foundActiveSlide.nextSibling.classList.add("active");
        } else {
            this.clearActiveClass();
            this.slides[0].classList.add("active");
        }
    }
}
