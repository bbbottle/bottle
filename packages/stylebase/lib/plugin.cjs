const {
  redKey, purpleKey, blueKey, darkBlueKey, orangeKey, greyKey, greenKey, darkKey, boldKey, brownKey, bgWhiteKey
} = require('./hljsConst');

module.exports = {
  handler: function ({ addBase, addUtilities, theme }) {
    addBase({
      h1: { fontSize: "2.25rem" },
      h2: { fontSize: "1.5rem" },
      h3: { fontSize: "1.25rem" },
      h4: { fontSize: "1rem" },
      h5: { fontSize: "1rem" },
      '.hljs': {
        color: '#24292e',
        background: '#ffffff'
      },
      '.prose pre': {
        color: '#24292f !important',
        backgroundColor: '#f6f8fa !important',
      },
      'a:focus': {
        outline: 'none',
        textDecoration: 'none',
      },
      '.hljs-emphasis': {
        fontStyle: 'italic',
      },
      '.hljs-strong': {
        fontWeight: 'bold',
      },
      [redKey]: {
        color: '#d73a49',
      },
      [purpleKey]: {
        color: '#6f42c1',
      },
      [blueKey]: {
        color: '#005cc5',
      },
      [darkBlueKey]: {
        color: '#032f62',
      },
      [orangeKey]: {
        color: '#e36209',
      },
      [greyKey]: {
        color: '#6a737d',
      },
      [greenKey]: {
        color: '#22863a',
      },
      [darkKey]: {
        color: '#24292e',
      },
      [boldKey]: {
        fontWeight: 'bold',
      },
      [brownKey]: {
        color: '#735c0f',
      },
      [bgWhiteKey]: {
        backgroundColor: '#ffeef0'
      },
    });
    addUtilities({
      '.no-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
      '.blur-cover': {
        'background-color': 'rgba(255, 255, 255, 0.5)',
        'backdrop-filter': 'blur(7px)',
      },
      ".lqip-blur": {
        backdropFilter: "blur(20px)",
      },
    })
  },
};
