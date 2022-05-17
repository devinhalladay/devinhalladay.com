/**
 * Util function to convert px values into rem.
 * Useful for getting better QA and collab from designers.
 * @param {*} px
 * @returns A rem value calculated from a 16px base font size.
 */
const rem = (px) => `${px / 16}rem`;

module.exports = {
  content: ['*.html'],
  theme: {
    fontSize: {
      // mobile
      xl: [
        rem(32),
        {
          lineHeight: rem(38),
          letterSpacing: '-0.02rem',
        },
      ],
      large: [
        rem(24),
        {
          lineHeight: rem(34),
          letterSpacing: '-0.02rem',
        },
      ],
      med: [
        rem(20),
        {
          lineHeight: rem(28),
          letterSpacing: '-0.02rem',
        },
      ],
      small: [
        rem(16),
        {
          lineHeight: rem(24),
          letterSpacing: '-0.02rem',
        },
      ],
    },
    extend: {
      fontFamily: {
        serif: ['Panama'],
        mono: ['Compagnon'],
      },
      colors: {
        yellow: '#fae820',
        replit: '#0279f2',
        'replit-light': '#44b7ff',
        hydro: '#fcfe5b',
        garden3d: '#ec8dd4',
        index: '#2cad60',
        'index-light': '#23dc6d',
        palantir: '#9cffc6',
        quora: '#b92b27',
        'quora-light': '#fe5a55',
        xxix: '#f8e71c',
        fotw: '#b79cff',
        robots: '#f94344',
        'robots-light': '#fe5a55',
        sanctu: '#4e75f1',
        'sanctu-light': '#89a5ff',
        github: '#6cc644',
        arena: '#b79e6e',
        'arena-light': '#edc273',
      },
    },
  },
  plugins: [],
};
