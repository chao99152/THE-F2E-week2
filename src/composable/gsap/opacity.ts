import gsap from 'gsap';

export default {
    beforeEnter: (el, done) => {
        el.style.opacity = 0
        el.style.transform = 'scale(1.05)'
    },
    Enter: (el, done) => {
        gsap.to(el, {
            duration: .55,
            opacity: 1,
            scale: 1,
            onComplete: done,
        })
    },

    Enter_delay: (el, done) => {
        gsap.to(el, {
            duration: 1,
            opacity: 1,
            delay: .5,
            onComplete: done,
        })
    },

    Leave: (el, done) => {
        gsap.to(el, {
            duration: .55,
            opacity: 0,
            transform: 'scale(1.05)',
            onComplete: done,
        })
    }
}


