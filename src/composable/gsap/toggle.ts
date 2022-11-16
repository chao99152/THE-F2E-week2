import gsap from 'gsap';

export default {
    beforeEnter: (el) => {
        el.style.opacity = 0
    },
    beforeLeave: (el) => {
        el.style.display = 'none'
    },
    Enter: (el, done) => {
        gsap.to(el, {
            position: 'relative',
            duration: .75,
            opacity: 1,
            onComplete: done,
        })
    },
    Leave: (el, done) => {
        gsap.to(el, {
            position: 'absolute',
            duration: .5,
            opacity: 0,
            onComplete: done,
        })
    },
}