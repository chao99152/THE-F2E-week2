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
      },
      fontSize: {
        sm: ['clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)', '1.4'],
        base: ['clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)', '1.5'],
        lg: ['clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)', '1.4'],
        xl: ['clamp(1.58rem, calc(1.46rem + 0.59vw), 1.88rem)', '1.4'],
        '2xl': ['clamp(1.89rem, calc(1.71rem + 0.89vw), 2.34rem)', '1.2'],
        '3xl': ['clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)', '1.1'],
        '4xl': ['clamp(2.72rem, calc(2.36rem + 1.83vw), 3.66rem)', '1'],
        '5xl': ['clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem)', '1'],
      },
      maxWidth: {
        'pc': '1440px',
      },
      minWidth: {
        'mobile': '376px'
      },
      height: {
        'heit1': 'calc(100vh - 60px)'
      },
      borderWidth: {
        'bd1': '1px',
      },

      backgroundColor: {
        'bg1': '#FFFAF4',
        'bg2': '#EEEDE8',
        'bg3': '#F9B471',
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
        'shadow3': ' 8px 4px 4px rgba(238, 237, 232, 0.5)'
      },
      gradientColorStops: {
        'gradbg1': '#FFFAF4 50%',
        'gradbg2': '#F9B471 50%',
      },
      backgroundSize: {
        'bgtrans1': '200% 100%'
      }
    },
  },
  plugins: [],
}
