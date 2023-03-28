import gsap from 'gsap';

export default {
    beforeEnter: (el: HTMLElement) => {
        el.style.opacity = '0',
            el.style.transform = 'scale(1.05)'
    },
    Enter: (el: HTMLElement, done: gsap.Callback) => {
        gsap.to(el, {
            duration: .55,
            opacity: 1,
            scale: 1,
            onComplete: done,
        })
    },

    Enter_delay: (el: HTMLElement, done: gsap.Callback) => {
        gsap.to(el, {
            duration: 1,
            opacity: 1,
            delay: .5,
            onComplete: done,
        })
    },

    Leave: (el: HTMLElement, done: gsap.Callback) => {
        gsap.to(el, {
            duration: .55,
            opacity: 0,
            transform: 'scale(1.05)',
            onComplete: done,
        })
    }
}