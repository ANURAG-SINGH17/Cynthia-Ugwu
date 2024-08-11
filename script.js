function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();


var timeout ;

function mousescale(){
  var xscale = 1;
  var yscale = 1;

  var pervX = 0;
  var pervY = 0;

  window.addEventListener("mousemove" , function(dets){
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8 , 1.2 , dets.clientX - pervX);
    yscale = gsap.utils.clamp(.8 , 1.2 , dets.clientY-pervY);

    pervX = dets.clientX;
    pervY = dets.clientY;
    
    mouseMoveFun(xscale,yscale);

    timeout = setTimeout(function () {
      document.querySelector("#mouseCir").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);


  })
}
mousescale();

function mouseMoveFun( xscale , yscale) {
    const mouseCir = document.querySelector("#mouseCir");

    window.addEventListener("mousemove", function (dets) {
        mouseCir.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    });
}

mouseMoveFun();


function firstPageGsap(){
    var tl = gsap.timeline();

    tl.from("nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })

    tl.from(".boundingElm" , {
        y: "100",
        opacity: 0,
        duration: 2,
        delay:-1,
        stagger:0.2,
        ease: Expo.easeInOut,
    });

    tl.from("#hero-footer",{
        y: "-10",
        opacity: 0,
        duration: 1.5,
        delay:-1.5,
        stagger:0.2,
        ease: Expo.easeInOut,
    })
}
firstPageGsap();


function secondPageGsap(){
 

  document.querySelectorAll("#elm").forEach(function (elem) {
    var rott = 0;
    var dffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top - 100;
      dffrot = dets.clientX - rott;
      rott = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, dffrot * 0.5),
      });
    });
  }

)}

secondPageGsap();