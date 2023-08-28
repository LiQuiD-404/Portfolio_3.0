gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

function loader() {
    var t1 = gsap.timeline();
    t1.to(".base", {
        delay: 1.8,
        height: "0vh",
        duration: 1.5,
        ease: Expo.easeInOut
    })
    t1.to(".layer1", {
        height: "100vh",
        duration: 1.5,
        delay: -1.5,
        ease: Expo.easeInOut
    })
    t1.to(".layer2", {
        height: "100vh",
        duration: 1.5,
        delay: -1.0,
        ease: Expo.easeInOut,
        onComplete: function () {
            animateHome()
        }
    })
}


function revealText() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var parent = document.createElement("span");
            var child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");

            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);
            elem.textContent = "";
            elem.appendChild(parent);

        });

    var t2 = gsap.timeline();

    t2.from(".middle .reveal .child span", {
        x: "100",
        duration: 1,
        stagger: 0.1,
        ease: Expo.easeInOut
    })
    t2.to(".reveal .parent .child", {
        delay: 0.2,
        transform: "translateY(-102%)",
        ease: Expo.easeIn
    })


}

gsap.set(".nav a", { y: "-200%", opacity: 0 });
gsap.set(".first", { y: 300, opacity: 0 });
gsap.set(".second .text", { y: 300, opacity: 0 });
gsap.set(".second svg", {opacity: 0 });

function animateSVG(){
    document.querySelectorAll("#Visual>g").forEach(function(e){
        var character = e.childNodes[1].childNodes[1];

        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';

        gsap.to("#Visual>g>g>path, #Visual>g>g>polyline",{
            strokeDashoffset: 0,
            duration: 1.3,
            ease : Expo.easeInOut,
        })
    })
}


function animateHome() {
    t1 = gsap.timeline();
    t1.to(".nav a", {
        y: "0%",
        opacity: 100,
        duration: 0.5,
        delay: -0.1,
        stagger : 0.2
    })
    t1.to(".first,.second .text",{
        y: 0,
        opacity: 100,
        duration: 0.8,
        stagger: 0.5,
        onComplete: function(){
            gsap.set(".second svg", {opacity: 100 });
            animateSVG();
            enableScroll();
        }

    })

}

gsap.set(".intro .left .content", { y: "-200%", opacity: 0 });

gsap.to(".pf",{
    transform: "rotate(0) translate(0,0)",
    ease: "sine.in",
    scrollTrigger:{
        trigger: ".intro",
        scroller: "#main",
        scrub:1,
        end: "top 10%"
    }
})
gsap.to(".intro .left .content",{
    transform: "translate(0,0)",
    opacity: 1,
    ease: "sine.in",
    scrollTrigger:{
        trigger: ".intro",
        scroller: "#main",
        scrub:1,
        end: "top 30%"
    }
})

gsap.set(".skillset", { x: "-200%", opacity: 0, transform: "rotate(-10deg)", });

gsap.to(".skillset",{
    x: 0,
    opacity: 1,
    stagger: 0.2,
    delay: 1,
    scrollTrigger:{
        trigger: ".skills_main",
        scroller: "#main",
        scrub:1,
        end: "top 1%"
    }
})

document.querySelectorAll(".img1").forEach(function (elem) {
    elem.addEventListener("mousemove", function (dets) {
        var element = dets.target
        document.querySelector(".works").style.backgroundColor = "#94c0cc";
        elem.addEventListener("mouseleave", function () {
            document.querySelector(".works").style.backgroundColor = "#f2f2f2";
        })
    })


})
document.querySelectorAll(".img2").forEach(function (elem) {
    elem.addEventListener("mousemove", function (dets) {
        var element = dets.target
        document.querySelector(".works").style.backgroundColor = "#ff99a8";
    })
    elem.addEventListener("mouseleave", function () {
        document.querySelector(".works").style.backgroundColor = "#f2f2f2";
    })

})

loader();
revealText();

