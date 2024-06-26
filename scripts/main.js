gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function loader() {
    var t1 = gsap.timeline();
    t1.to(".base", {
        delay: 1.7,
        height: "0vh",
        duration: 1.6,
        ease: Expo.easeInOut
    })
    t1.to(".layer1", {
        height: "100vh",
        duration: 1.7,
        delay: -1.6,
        ease: Expo.easeInOut
    })
    t1.to(".layer2", {
        height: "100vh",
        duration: 1.5,
        delay: -0.5,
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

function getHexColor() {
    // Generate a random number between 192 and 255 for the R, G, and B components
    const red = Math.floor(Math.random() * 64 + 192); // 192 to 255
    const green = Math.floor(Math.random() * 64 + 192); // 192 to 255
    const blue = Math.floor(Math.random() * 64 + 192); // 192 to 255

    // Convert the RGB values to a hex color
    const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

    return hexColor;
}

gsap.set(".nav a", { y: "-200%", opacity: 0 });
gsap.set(".first", { y: 300, opacity: 0 });
gsap.set(".second .text", { y: 300, opacity: 0 });
gsap.set(".second svg", { opacity: 0 });

function animateSVG() {
    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.childNodes[1].childNodes[1];

        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';

        gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
            strokeDashoffset: 0,
            duration: 1.3,
            ease: Expo.easeInOut,
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
        stagger: 0.2
    })
    t1.to(".first,.second .text", {
        y: 0,
        opacity: 100,
        duration: 0.8,
        stagger: 0.5,
        onComplete: function () {
            gsap.set(".second svg", { opacity: 100 });
            animateSVG();
        }

    })

}

gsap.set(".intro .left .content", { y: "-200%", opacity: 0 });

gsap.to(".pf", {
    transform: "rotate(0) translate(0,0)",
    ease: "sine.in",
    scrollTrigger: {
        trigger: ".intro",
        scroller: "#main",
        scrub: 1,
        end: "top 10%"
    }
})
gsap.to(".intro .left .content", {
    transform: "translate(0,0)",
    opacity: 1,
    ease: "sine.in",
    scrollTrigger: {
        trigger: ".intro",
        scroller: "#main",
        scrub: 1,
        end: "top 30%"
    }
})

gsap.set(".skillset", { x: "-200%", opacity: 0, transform: "rotate(-10deg)", });

gsap.to(".skillset", {
    x: 0,
    opacity: 1,
    stagger: 0.2,
    delay: 1,
    scrollTrigger: {
        trigger: ".skills_main",
        scroller: "#main",
        scrub: 1,
        end: "top 1%"
    }
})

var color = "";

document.querySelectorAll(".img1").forEach(function (elem) {
    let color = getHexColor();
    elem.addEventListener("mousemove", function (dets) {
        var element = dets.target
        document.querySelector(".works").style.backgroundColor = color;
        elem.addEventListener("mouseleave", function () {
            document.querySelector(".works").style.backgroundColor = "#f2f2f2";
        })
    })


})
document.querySelectorAll(".img2").forEach(function (elem) {
    let color = getHexColor();
    elem.addEventListener("mousemove", function (dets) {
        var element = dets.target
        document.querySelector(".works").style.backgroundColor = color;
    })
    elem.addEventListener("mouseleave", function () {
        document.querySelector(".works").style.backgroundColor = "#f2f2f2";
    })

})

document.getElementById('overcast').addEventListener('click', function () {
    window.open("https://liquid-404.github.io/OverCast-Weather-App/", "_blank")
})

document.getElementById('lumos').addEventListener('click', function () {
    window.open("https://lumos-gradients.vercel.app/", "_blank")
})

document.getElementById('portfolio').addEventListener('click', function () {
    window.open("https://shubbhh.vercel.app/", "_blank")
})
document.getElementById('reflex').addEventListener('click', function () {
    window.open("https://reflexaimtrainer.vercel.app/", "_blank")
})
document.getElementById('critique').addEventListener('click', function () {
    window.open("https://critique-db.vercel.app/", "_blank")
})

gsap.set(".social_container .card", { y: "-100%", opacity: 0, transform: "rotate(150deg)" });

gsap.to(".social_container .card", {
    y: 0,
    transform: "rotate(0deg)",
    opacity: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".social_container",
        scroller: "#main"
    }
})

gsap.set(".bg_contact", { scale: 1 });

gsap.to(".bg_contact", {
    scale: 10,
    scrollTrigger: {
        trigger: ".contact",
        scroller: "#main",
        scrub: 1
    }
})

gsap.set(".workcontainer", { scale: 0, opacity: 0 });

gsap.to(".workcontainer", {
    scale: 1,
    opacity: 1,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
        trigger: ".workmain",
        scroller: "#main",

    }
})

gsap.to('.slider2 p', {
    end: 'top 500px',
    transform: "translate(-1800px,0)",
    scrollTrigger: {
        trigger: ".works",
        scroller: "#main",
        scrub: 1
    }
});


loader();
revealText();

