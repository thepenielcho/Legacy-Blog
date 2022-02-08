---
title: "Tailwind CSS 버전 V2에서 V3으로 에러 없이 업그레이드하기 (feat. TypeError: Cannot read property '700' of undefined)"
description: "기존 프로젝트의 V2 Tailwind CSS V3으로 에러 없이 버전 업그레이드하는 법에 대해 알아보자."
slug: tailwind-v3-error
img: tailwind.jpeg
datetime: 2022. 02. 08.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: Featured
---

선 결론 후 설명 레츠고...

## 결론

위 명령어부터 하나하나 돌려보자. 아마도 에러 없이 잘 작동될 것이다.

```shell
$ npm install -D @tailwindcss/typography@latest
$ npm install -D @tailwindcss/forms@latest
$ npm install -D @tailwindcss/aspect-ratio@latest
$ npm install @tailwindcss/line-clamp@latest
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

로컬 핫로드 돌릴 때 `purge`, `content`, `darkMode` 관련 에러가 뜬다면 커스텀 여부에 따라 두가지 방법이 있다.

1. 커스텀했다 > [본 글](https://tailwindcss.com/docs/upgrade-guide#configure-content-sources) 참고하셔서 `tailwind.config.js` 의 Outdated 옵션들 삭제 및 변경하기
2. 커스텀 안했다 > 기존 `tailwind.config.js` 삭제하고 아래 명령어로 V3 버전 `tailwind.config.js` 파일 새로 생성하기

```shell
$ npx tailwindcss init
```

## 설명

사건의 발단: 오랫동안 방치해둔 [코사다마](https://cosadama.com)의 [블로그](https://www.blog.cosadama.com)를 업데이트하기로 했다. 메인 index 이미지에  `zinc` 컬러* Gradient를 주려고 했는데, 아무런 변화가 없었다. `npm run dev`를 두세차례 반복하다가 본 프로젝트에 적용된 Tailwind CSS 버전이 V2임을 깨달았다. V3에 업그레이드된 피쳐가 너무 많았기에 버전 업을 하기로 마음 먹었다.

> (참고로 V2까지는 회색 컬러가 Gray 뿐이었는데, 되게 푸른빛을 띄는 Gray 색상이었다. 색 강도 옵션에 따라 남색으로 보일 정도. 그런데 V3부터는 회색 표현 컬러가 Slate, Gray, Zinc, Neutral, Stone으로 매우 다양해졌다. 순서대로 푸른빛 ~ 노란빛을 띈다.)

### 최신 버전(V3)으로 업그레이드

```shell
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

명령어를 쳐서 업데이트를 시도했고, 다음과 같은 에러를 마주했다.

```shell
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! Found: tailwindcss@3.0.19
npm ERR! node_modules/tailwindcss
npm ERR!   dev tailwindcss@"3.0.19" from the root project
npm ERR!   peer tailwindcss@">=2.0.0" from @tailwindcss/aspect-ratio@0.2.1
npm ERR!   node_modules/@tailwindcss/aspect-ratio
npm ERR!     @tailwindcss/aspect-ratio@"^0.2.1" from the root project
npm ERR!   1 more (@tailwindcss/typography)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer tailwindcss@"1 || 2 || 2.0.1-compat" from tailwind-config-viewer@1.6.2
npm ERR! node_modules/tailwind-config-viewer
npm ERR!   tailwind-config-viewer@"^1.6.2" from @nuxtjs/tailwindcss@4.2.1
npm ERR!   node_modules/@nuxtjs/tailwindcss
npm ERR!     dev @nuxtjs/tailwindcss@"^4.2.0" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! See /Users/penielcho/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/penielcho/.npm/_logs/2022-02-08T11_04_40_837Z-debug.log
```

에러에서 요구하는 대로 아래와 같은 명령어를 사용해보았지만, 두 명령어 모두 위와 동일한 에러 메세지를 출력했다.

```shell
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest --legacy-peer-deps
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest --force
```

에러 중 `npm ERR! See /Users/penielcho/.npm/eresolve-report.txt for a full report.` 메시지에 따라 full report를 확인해보니 내가 사용하는 Tailwind 확장 모듈인 `typography`를 제외하고도 `forms`, `aspect-ratio`, `line-clamp` 관련 에러 메시지가 있었다. 더 자세히는 `styles.js` 파일에서 에러가 발생했다는 점을 알 수 있었고, 문제가 되는 코드를 보니 다음과 같았다.

```javascript
module.exports = (theme) => ({ DEFAULT: { css: [ { color: theme('colors.gray.700', defaultTheme.colors.gray[700]), }]}
```

위 네 모듈 중 Color Theme을 사용하는 모듈은 `typography`, `forms` 밖에 없으니 두 모듈을 업데이트하는 과정에서 문제가 생겼음을 알 수 있었다. 실제로 사용하는 모듈이 `typography` 밖에 없는 상황에서 `forms` 없이 `tailwind css` 전체 버전 업을 하니 문제가 생겼겠구나 판단했고, 이에 `forms` 모듈을 최신 버전으로 설치했다. 혹시나 외부 모듈 버전이 모두 다르면 이건 이거 나름대로 에러를 낼까봐 그냥 외부 모듈 네개 모두를 최신 버전으로 업데이트 및 설치했다.

```shell
$ npm install -D @tailwindcss/typography@latest
$ npm install -D @tailwindcss/forms@latest
$ npm install -D @tailwindcss/aspect-ratio@latest
$ npm install @tailwindcss/line-clamp@latest
```

이후 떨리는 마음으로 `tailwind css` 전체 버전업을 시도했고...

```shell
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

![에러 해결](/tailwind-v3-error/tailwind-fixed.png)

성공ㅠ 업데이트 과정이 매우 귀찮았고, 구글링을 통해 에러 해결 방법을 찾지 못했기에 같은 문제를 마주하는 분들이 쉽게 버전 업그레이드를 진행하시기를 바라는 마음으로 글을 작성한다.

### 로컬 핫 로드 `npm run dev` 시 에러

`Tailwind CSS`가 V3에서 보이는 에러는 핫 로드에도 존재하는데, 기존 `tailwind.config.js` 파일의 설정 때문에 발생하는 오류가 그것이다. 이를 해결하는 방법은 생각보다 간단하다. 에러 메시지로 뜨는  `purge`, `content`, `darkMode` 옵션을  [본 글](https://tailwindcss.com/docs/upgrade-guide#configure-content-sources)을 참고해서 수정해주면 된다. 더 쉬운 방법도 존재한다. 만약 `tailwind.config.js` 를 통해 `Tailwind CSS` 를 커스텀하지 않았다면 그냥 `tailwind.config.js` 파일을 삭제하고, 새로운 버전의 `tailwind.config.js` 파일을 생성하면 된다. `tailwind.config.js` 생성 코드는 아래와 같다.

```shell
$ npx tailwindcss init
```
