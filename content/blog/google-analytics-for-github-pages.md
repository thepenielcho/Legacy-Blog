---
title: GitHub Pages로 배포한 웹사이트에 Google Analytics 구글 애널리틱스 연결하기
description: 깃헙 페이지로 배포한 웹사이트에 구글 애널리틱스를 연결하는 법을 알아보자.
slug: google-analytics-for-github-pages
img: google-analytics.png
datetime: 2021. 11. 25.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: none
---

글에 들어가기에 앞서, Google Analytics 트랙킹 ID 발급받는 법을 모른다면 [관련 포스팅](https://www.blog.cosadama.com/google-analytics-tracking-id)을 먼저 읽어주시길 바란다. 또한 본 포스팅은 Nuxt 프레임워크로 개발된 정적 웹사이트를 기준으로 한다.

Netlify를 통해 웹사이트를 배포할 경우, 설정을 통해 프로젝트 개별 파일에 코드를 직접 작성하지 않고도 온라인 빌드 시 Head나 Body 이전에 Google Analytics 트랙킹용 Snippet 코드를 삽입할 수 있다. 반면 GitHub Pages를 통한 배포의 경우 yml 파일을 통한 환결설정에 기반해 gh actions를 통해 빌드가 이뤄지기 때문에 파일 자체에 코드를 적지 않고 온라인 빌드 도중 코드를 삽입하기는 쉽지 않다. 

이로 인해 GitHub Pages와 GitHub Actions를 사용해 Nuxt 정적 웹사이트를 배포할 경우 모든 코드가 거쳐가는 default.vue 파일 내 script 부분에 Google Analytics 트랙킹을 위한 코드를 직접 적어 넣어야 한다. 트랙킹을 위한 코드는 아래와 같다.

```vue
<script>
export default {
  head() {
    let productionScripts = []
    if (process.env.NODE_ENV === 'production') {
      productionScripts = [
        { hid: 'analytics', src: 'https://www.googletagmanager.com/gtag/js?id=UA-3625XXXX-1', defer: true },
        { hid: 'analytics-script', innerHTML: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-3625XXXX-1');", type: 'text/javascript' }
      ]
    }

    return {
      title: "Test Analytics",
      script: [

      ].concat(productionScripts),
      // __dangerouslyDisableSanitizers: ['script']
      __dangerouslyDisableSanitizersByTagID: {
        'analytics-script': ['innerHTML']
      }
    }
  }
}
</script>
```

트랙킹 코드 작성 및 배포가 완료되었다면 배포 후 배포된 웹사이트에서 몇가지 이벤트를 행한 후 Google Analytics > 실시간 탭에 들어가 제대로 추적되고 있는지 확인해보자. 최근 30분 간의 방문 및 이벤트 여부를 실시간 추적한 결과를 보여주므로 보다 즉각적인 데이터 수집 여부 파악이 가능하다.

![실시간 탭](/google-analytics-for-github-pages/01.png)

만약 Nuxt 동적 웹사이트에 Google Analytics를 적용하고 싶다면 [google-analytics-module](https://github.com/nuxt-community/google-analytics-module) 설치를 통해 가능하다.

참고 : [Nuxt Google Analytics | Lua Software Code](https://code.luasoftware.com/tutorials/nuxtjs/nuxt-google-analytics/)