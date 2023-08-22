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
        }

    })

}


gsap.to(".pf",{
    transform: "rotate(0) translate(0,0)",
    scrollTrigger:{
        trigger: ".intro",
        scrub:1,
        end: "top 10%"
    }
})


loader()
revealText();

