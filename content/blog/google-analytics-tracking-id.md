---
title: Google Analytics 추적 ID 발급받기
description: 구글 애널리틱스 추적 ID 발급방법에 대해 알아보자.
slug: google-analytics-tracking-id
img: google-analytics.png
datetime: 2021. 11. 24.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: none
---

처음 웹사이트를 만들고 Google Analytics를 적용하는데 Tracking ID 발급 설명 없이 바로 코드로 넘어가 당황했던 기억이 있다. 새로운 웹사이트를 배포하며 GA를 설정하는 김에 해당 기억을 되살려 추적 ID 발급받는 과정을 캡쳐하여 공유한다. 본인처럼 헤매는 분들이 없기를!

![실시간 탭](/google-analytics-tracking-id/01.png)

처음 들어가면 다음과 같은 화면이 뜬다. 측정시작을 누르자.

![실시간 탭](/google-analytics-tracking-id/02.png)

계정 이름 및 공유설정란이 뜬다. 이때 계정은 gmail로 대표되는 구글 계정이 아닌 웹사이트 관리자 명칭 정도로 생각하면 된다. 아래 설정은 보안이 필요한 정보를 소지한 웹이 아닌 경우 웬만하면 다 체크해주는 게 좋다.

![실시간 탭](/google-analytics-tracking-id/03.png)

속성 이름을 적으라고 한다. 이때 속성은 웹사이트에서 가져올 데이터를 칭하는 명칭이다. 사이트 규모가 크지 않을 경우 단일 속성을 사용하기에 사이트 title을 적으면 좋으나, 아무거나 적어도 상관은 없다. 추후 추적할 속성 및 웹사이트들과 구분만 되게 적어주자.

![실시간 탭](/google-analytics-tracking-id/04.png)

비즈니스 정보를 선택하라고 하는데, 현재 웹사이트 사용 규모 및 제작 용도에 맞춰 적절히 선택해주면 된다.

![실시간 탭](/google-analytics-tracking-id/05.png)

비즈니스 정보 선택 후 약관 동의까지 마치면, 다음과 같이 본 웹사이트(속성)를 위한 GA 페이지가 보인다. 이 중 데이터스트림에 들어가 플랫폼 중 웹을 선택해주자.

![실시간 탭](/google-analytics-tracking-id/06.png)

선택이 완료되었다면 다음과 같은 창이 뜬다. 웹사이트의 URL 주소와 웹사이트 명을 적어준 후, 스트림 만들기를 눌러주면 된다.

![실시간 탭](/google-analytics-tracking-id/07.png)

이후 측정 ID가 만들어진다. ID는 G-로 시작하기도, UA-로 시작하기도 한다. 큰 문제는 없으나, 특정 프레임워크나 배포 플랫폼의 경우 UA로 시작하는 ID가 필요하다고 한다. 이 경우 ID를 UA로 변경도 가능하다.

측정 ID 발급은 이렇게 끝이다. 이제 발급받은 ID를 통해 배포 플랫폼에 따라 어떻게 Google Analytics를 적용하는지에 따라 알아보자.

[GitHub Pages로 배포한 웹사이트에 Google Analytics 연결하기](https://www.blog.cosadama.com/google-analytics-for-github-pages)