import gsap from 'gsap';

export default {
    beforeEnter: (el: HTMLElement) => {
        el.style.opacity = '0'
    },
    beforeLeave: (el: HTMLElement) => {
        el.style.display = 'none'
    },
    Enter: (el: HTMLElement, done: gsap.Callback) => {
        gsap.to(el, {
            position: 'relative',
            duration: .75,
            opacity: 1,
            onComplete: done,
        })
    },
    Leave: (el: HTMLElement, done: gsap.Callback) => {
        gsap.to(el, {
            position: 'absolute',
            duration: .5,
            opacity: 0,
            onComplete: done,
        })
    },
}