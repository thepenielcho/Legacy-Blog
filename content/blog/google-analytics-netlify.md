---
title: Netlify로 배포한 웹사이트에 Google Analytics 구글 애널리틱스 연결하기
description: Netlify로 배포한 웹사이트에 구글 애널리틱스를 연결하는 법을 알아보자.
slug: google-analytics-netlify
img: google-analytics.png
datetime: 2022. 01. 27.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: none
---

이전에 Google Analytics 연결 시리즈로 적으려 했던 포스팅인데, 늦게나마 올려본다. 🥲


혹시나 Google Analytics Tracking ID 발급방법을 모르시는 분들은 [이 포스팅](https://www.blog.penielcho.com/google-analytics-tracking-id)을 보고 와주시길!


Google Analytics에서 새로 속성을 만들어 웹 트랙킹 ID를 발급했다면, Netlify로 들어가보자. 원하는 사이트를 선택해 Site Setting 버튼을 눌러 들어간다.

![netlify site setting](/google-analytics-netlify/ga1.png)

메뉴 바에서 Build & Deploy를 누르고 주욱 내려가 Snippet Injection 섹션을 찾는다. 찾았다면 Add Snippet을 눌러 아래 코드를 작성한다.

```javascript
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXX');
</script>
```

이때 당연하게도!!! G-XXXXXX 부분에는 직접 발급받은 트랙킹 ID를 적어주어야 한다.

![add snippet](/google-analytics-netlify/ga2.png)

 Snippet의 이름은 아무렇게나 지어도 상관이 없지만, 본인은 후에 알아보기 쉽게 Google Analytics라 적었다.



작성이 완료되었다면 몇분 기다린 후 방금 연결을 마친 사이트를 켜두자. 사이트를 켜둔 후 Google Analytics로 돌아가보면 실시간 트랙킹 리포트에 숫자가 뜰 것이다. 숫자가 정상적으로 잘 뜨면 트랙킹이 정상적으로 이뤄진 것으로 완성!

![google analytics working](/google-analytics-netlify/ga3.png)

