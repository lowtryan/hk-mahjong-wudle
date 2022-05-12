# Hong Kong Mahjong Wudle | 香港麻雀 糊dle

This is a clone project of a popular word guessing game made using React, Typescript, and Tailwind.

[https://hkwudle.vercel.app/](https://hkwudle.vercel.app/)

## Build and Run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$ cd hk-mahjong-wudle
$ npm install
$ npm run start
```

### To build/run docker container:

```bash
$ docker build -t game .
$ docker run -d -p 3000:3000 game
```

open http://localhost:3000 in browser.

## Credits and Licenses

This game was inspired by [Wordle](https://www.powerlanguage.co.uk/wordle/).

This game is a fork of [yf-dev/mahjong-hand-guessing-game](https://github.com/yf-dev/mahjong-hand-guessing-game), which is a fork of [cwackerfuss/react-wordle](https://github.com/cwackerfuss/react-wordle).

Uses [twitter/twemoji](https://github.com/twitter/twemoji) as favicon, licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Uses [SyaoranHinata/I.Mahjong](https://github.com/SyaoranHinata/I.Mahjong) as the tiles, licensed under [M+ Fonts License](https://mplusfonts.github.io/).
