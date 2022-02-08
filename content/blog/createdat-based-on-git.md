---
title: Nuxt Content에서 Git 히스토리 기반으로 createdAt 날짜 고정시키기
description: 배포 후 달라지는 createdAt 속성값, git history를 기준으로 고정시키는 법에 대해 알아보자.
slug: createdat-based-on-git
img: nuxt-content.png
datetime: 2021. 11. 27.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: none
---


블로그 등의 문서 사이트를 만드는 것이 목적이라면 Nuxt Content 모듈은 정말 좋은 선택지다. 다만 한가지 아쉬운 점을 꼽자면, 파일의 생성일자를 자동으로 제공해주는 Nuxt Content의 createdAt과 updatedAt 속성이 로컬과 배포 후 서버에서 계속 차이가 난다는 점이다. 이러한 이유로 본인은 수기로 작성일자 value를 적어 사용하곤 했다. 

그러나 날짜를 이 같이 수기로 적는 건 팀 단위 프로젝트에서는 불가능했다. 연도를 뒤에 쓰는 사람, 대쉬(-) 대신 점을 쓰는 사람 등 날짜 표기 방법이 모두 달라 매번 버그가 발생하는 것이다.

이를 해결하기 위해 구글링을 하던 도중, 파일 메타데이터가 아닌 깃 히스토리를 사용해 createdAt / updatedAt 속성값을 지정해주는 모듈을 발견했다. 즉 로컬과 서버 모두에서 동일한 값을 제공하는 자동 날짜 생성 모듈인 것이다. 해당 모듈의 이름은 `nuxt-content-git`으로, [Sebastian Landwehr](https://github.com/dword-design)가 개발하였다. 본 모듈의 사용법에 대해 알아보자.

## Netlify 등 자동 CI / 배포 툴을 사용할 경우

자동 CI 툴의 경우 설치 및 config에 모듈 추가만 해주면 된다.

### 설치

```shell
# npm
$ npm install nuxt-content-git
# yarn
$ yarn add nuxt-content-git
```

사용하는 패키지 매니저에 따라 모듈을 설치해주자.

### 모듈 추가

설치 이후엔 `nuxt.config.js`  파일에 모듈을 추가해주면 된다. 다만 이때, `nuxt-content-git`  모듈은  `@nuxt/content`  모듈보다 앞에 와야 한다.

```javascript
export default {
  modules: [
    'nuxt-content-git',
    '@nuxt/content',
  },
}
```

이 경우 기존 메타데이터에서 가져온 createdAt, updatedAt 속성값이 git history에 기반한 값으로 대체(덮어쓰기)된다. 만약 기존 메타데이터 값도 남기되 git history에 기반한 생성/수정일자도 필요하다면, 아예 새로운 값을 만들 수도 있다. 본 방법은 아래와 같이 새로운 속성을 지정해주는 것으로 가능하다. 

```javascript
export default {
  modules: [
    ['nuxt-content-git', {
      createdAtName: 'gitCreatedAt',
      updatedAtName: 'gitUpdatedAt',
    }],
    '@nuxt/content',
  ],
}
```

당연하지만, 이 경우 git 기반 생성일자를 원한다면 `article.gitCreatedAt` 을, 메타데이터 기반 생성일자를 원한다면 `article.createdAt ` 을 사용하면 된다.

자동 CI, 배포 툴을 사용한다면 여기서 끝! 바로 git history 기반 createdAt / updatedAt 사용이 가능하다.

## GitHub Actions 등 커스텀 CI 툴을 사용할 경우

커스텀 CI 툴을 사용할 경우 한가지 과정을 더 거칠 필요가 있다. 이는 CI 기본 설정이 git history를 포함한 모든 데이터를 가져오는 것이 아닌, 필요한 데이터만을 가져오기 때문이다. 따라서 git history 기반의 createdAt / updatedAt 속성을 사용하기 위해서는 모든 데이터를 가져올 필요가 있다.

### yml 파일 내 코드 추가

GitHub Actions를 예시로 들자면, workflows 폴더 내 build 및 deploy 환경을 세팅하는 yml 파일에 코드를 추가하는 형식으로 해결이 가능한데, 아래 주석처리된 '이 부분을 추가해주세요'에 해당하는 코드를 추가하면 된다.

```yaml
name: cd

on: [push, pull_request]

jobs:
  cd:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [14]

    steps:
      - name: Checkout
        uses: actions/checkout@master
        with: # 이 부분을 추가해주세요
          fetch-depth: 0 # 이 부분을 추가해주세요

      - name: Setup node env
        uses: actions/setup-node@v2.1.2
        with:
          node-version: ${{ matrix.node }}

      - name: Install dependencies
        run: yarn

      - name: Generate
        run: yarn run generate

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

이렇게 수정해주면 끝! 만약 위와 같은 설정이 없이 바로 배포하게 된다면, 매 배포마다 배포 당일의 일자로 createdAt / updatedAt 일자가 바뀌게 된다. 만약 커스텀 CI 툴을 사용한다면 반드시 수정해주자.

## 함수 사용

단순히 날짜 순으로 요소 배열을 할 것이 아니라 화면 상 날짜를 보여주기 위해 createdAt 속성을 사용한다면, 해당 속성값을 바로 사용할 수 없다. 이는 createdAt, updatedAt의 속성값의 기본 형태가 다음과 같기 때문이다.

```javascript
2021-12-09T07:31:56.000Z
```

단순히 날짜가 표시된 앞 부분을 떼어와도 좋지만, 보다 친절하게 날짜를 표시할 수도 있다. 이 경우 사용가능한 함수 및 그 활용은 아래와 같다.

```vue
<template>
	...
	{{formatDate(article.createdAt)}} <!--ko 옵션 기준 위 속성값은 2021년 12월 7일과 같이 표시된다.-->
	...
</template>

<script>
export default{
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ko', options) //en 등도 가능
        }
    },
}
</script>
```



### 여담

기존 [`nuxt-content-git` 공식 문서](https://github.com/dword-design/nuxt-content-git)에는 커스텀 CI 툴을 이용한 배포 시 에러에 관한 내용이 없었다. 이는 21년 11월 26일자로 추가되었는데, 본인이 GitHub Actions를 통해 배포한 웹사이트에 적용이 안되어 이슈를 남긴 것이 계기가 되었다. 사용 규모가 작은 모듈이긴 하지만 이슈 남긴 내용이 공식 문서에 추가된 경험은 처음이라 본 포스팅을 통해 흔적을 남겨본다.

![이슈 오픈](/createdat-based-on-git-history/01.png)

앞서 언급했듯 문제가 되었던 부분은 fetch 부분인데, Nuxt 공식 문서에서 제공하는 GitHub Actions용 yml 코드는 전체 데이터를 패치하는 방식이 아닌 필요한 일부 데이터만을 가져온다. 이로 인해 git history가 부재하여 배포 당일의 일자가 createdAt 속성값으로 매겨지는 것이다.

![답변](/createdat-based-on-git-history/02.png)

[Sebastian Landwehr](https://github.com/dword-design)의 도움으로 문제는 바로 해결되었다. 당시 꽤나 골머리를 앓고 있었는데 얼마나 고맙던지...ㅠㅠ

![공식 문서](/createdat-based-on-git-history/03.png)

본 이슈 관련 해결방안은 바로 `nuxt-content-git`  공식문서에 포함되었다. 해결책도 내가 내지 않았고 contribute한 것도 아니지만, 비슷한 문제를 겪으셨을 분들이 많았을 듯해 뿌듯한 경험이었다.