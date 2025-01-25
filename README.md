# C-helper Codex version

A modern rewrite of the C-helper gadget for French Wikipedia, using Vue.js and the Codex component library.


## About

C-helper Codex is a new version of the C-helper gadget, an essential maintenance tool for French Wikipedia. This rewrite modernizes the user interface while preserving the core functionalities that the community relies on.

### Key Improvements

- Modern UI based on Codex, Wikimedia's official design system
- Full mobile device support (Minerva skin compatibility)
- Optimized maintenance template display with the support of [[]]`` 
- More intuitive and responsive interface

## Technical Details

### Prerequisites
- Node.js
- npm (I used pnpm)

### Tech Stack
- Vue 3
- TypeScript
- Wikimedia Codex
- Vite with vite-plugin-mediawiki-userscript

### Development Setup

1. Clone the repository:
```bash
git clone [REPO_URL]
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Add the development script to your common.js on Wikipedia (exact code will be displayed on the development page)

### Build

To build the final script:
```bash
pnpm run build
```

## Roadmap

### Short Term
- Implementation of Speedy Deletion menu

### Long Term
- Smart template positioning in articles
- Optimization of multiple templates handling
- Code refactoring for better maintainability

## Contributing

Contributions are welcome! Feel free to open an issue to discuss any changes you'd like to make.

## Credits
- [0x010C](https://fr.wikipedia.org/wiki/Utilisateur:0x010C) for creating the [original script](https://fr.wikipedia.org/wiki/MediaWiki:Gadget-C_helper.js)
- Wikimedia Foundation for Codex
- [ChlodAlejandro](https://github.com/ChlodAlejandro) for 
[vite-mediawiki-userscript-template](https://github.com/ChlodAlejandro/vite-mediawiki-userscript-template)


## Note

This tool is specifically designed for French Wikipedia maintenance tasks. While the code base could be adapted for other wikis, the current implementation is tailored to French Wikipedia's specific maintenance templates and workflows.