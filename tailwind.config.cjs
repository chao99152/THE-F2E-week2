/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      screens: {
        'xs': '376px',
        'mobile': '576px',
        'tablet': '768px',
        'pc': '1440px'
      },
      colors: {
        'style1': '#51A8BC',
        'style2': '#E2E1DD',
        'style3': '#A5A39C',
        'style4': '#4D4C52',
        'style5': '#F9B471',
        'style6': '#D9D9D9',

      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          '288rem': '2.88rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        'notosans-light': ['notosans-light'],
        'inter': ['inter'],
      },
      fontSize: {

        'xxs': ['clamp(0.72rem, calc(0.71rem + 0.09vw), 0.77rem)'],
        'xs': ['clamp(0.87rem, calc(0.83rem + 0.18vw), 0.96rem)'],
        'sm': ['clamp(1.04rem, calc(0.98rem + 0.31vw), 1.20rem)'],
        'base': ['clamp(1.25rem, calc(1.15rem + 0.49vw), 1.50rem)'],
        'md': ['clamp(1.50rem, calc(1.35rem + 0.73vw), 1.88rem)'],
        'lg': ['clamp(1.80rem, calc(1.59rem + 1.06vw), 2.34rem)'],
        'xl': ['clamp(2.16rem, calc(1.86rem + 1.50vw), 2.93rem)'],
      },
      width: {
        'pc': '1440px',
      },
      maxWidth: {
        'pc': '1440px',
      },
      minWidth: {
        'mobile': '376px'
      },
      height: {
        'heit1': 'calc(100vh - 60px)',
        'heit2': 'calc(100vh - 140px)',
        'navH': '60px'
      },
      borderWidth: {
        'bd1': '1px',
      },
      borderColor: {
        'bc1': '#A5A39C',
        'bc2': '#EEEDE8',
      },
      backgroundColor: {
        'bg1': '#FFFAF4',
        'bg2': '#EEEDE8',
        'bg3': '#F9B471',
        'bg4': '#51A8BC',
        'bg5': '#F9F8F6',
      },
      borderRadius: {
        'px10': '10px',
        'px20': '20px',
        'px30': '30px',
        'px35': '35px'
      },
      dropShadow: {
        'shadow1': '0px 4px 1px rgba(0, 0, 0, 0.15)',
        'shadow2': '0px 4px 4px #EEEDE8',
        'shadow3': '8px 4px 4px rgba(238, 237, 232, 0.5)',
        'shadow4': '-8px 4px 4px rgba(238, 237, 232, 0.5)',
      },
      gradientColorStops: {
        'gradbg1': '#449baf 50%',
        'gradbg2': '#F9B471 50%',
      },
      backgroundSize: {
        'bgtrans1': '100% 200%'
      },
      margin: {
        'navH': '60px'
      },
      padding: {
        'navH': '60px'
      },
      animation: {
        loading: 'loading 2s ease forwards'
      },
      keyframes: {
        loading: {
          '0%': { height: '100%' },
          '100%': { height: '0%' },
        }
      }
    },
  },
  plugins: [],
}