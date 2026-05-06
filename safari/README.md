# tabash Safari macOS port

이 폴더는 Chrome 전용 tabash 확장을 macOS Safari Web Extension으로 실행하기 위한 로컬 전용 포트입니다.

## 구성

- `web-extension/`: Safari용으로 복제한 Web Extension 소스입니다. 원본 Chrome 소스는 수정하지 않습니다.
- `web-extension/src/utils/webExtensionApi.ts`: Safari의 `browser` API와 Chromium의 `chrome` API를 모두 받을 수 있는 작은 어댑터입니다.
- `tabash/`: `xcrun safari-web-extension-packager`로 생성한 macOS Safari Web Extension 컨테이너 앱 프로젝트입니다.
- `scripts/build-local.sh`: web extension 빌드, Safari app resource 동기화, unsigned Debug app 빌드를 한 번에 수행합니다.
- `build/Debug/tabash.app`: 로컬 빌드 결과물입니다. 이 경로는 빌드 후 생성됩니다.

## 포팅된 기능

Safari에서 유지되는 기능:

- 새 탭 shell UI
- 링크 등록: `[key]=[url]`
- 링크 열기: `[key]`
- 링크 목록: `ls`
- 링크 삭제/이름 변경: `rm`, `mv`
- `echo`, `clear`, `help`
- JSON `import`, `export`
- Google 검색: `g [keywords]`
- dark/light mode
- `set-wallpaper` 커스텀 배경
- 일반 웹 페이지에서 command palette

Safari 제약:

- Chrome manifest의 `incognito: split`은 Safari에서 지원되지 않아 제거했습니다. Private Browsing 동작은 Safari가 제어합니다.
- Safari 내부 페이지, 확장 페이지, 권한이 없는 페이지에서는 content script와 command palette가 동작하지 않을 수 있습니다.
- command palette는 `<all_urls>` content script와 `host_permissions`를 사용하므로 Safari에서 웹 사이트 접근 권한을 허용해야 합니다.
- App Store 배포용 signing/notarization은 포함하지 않았습니다.

## 빌드

전체 로컬 빌드:

```sh
safari/scripts/build-local.sh
```

스크립트가 수행하는 작업:

1. `safari/web-extension`에 의존성이 없으면 `npm ci`를 실행합니다.
2. `npm --prefix safari/web-extension run build`를 실행합니다.
3. `safari/web-extension/dist`를 `safari/tabash/tabash Extension/Resources`로 동기화합니다.
4. `xcodebuild`를 `Sign to Run Locally`에 해당하는 ad-hoc 서명으로 실행합니다.
5. `safari/build/Debug/tabash.app`을 생성합니다.

Web Extension만 확인하려면:

```sh
npm --prefix safari/web-extension run build
```

## Safari에 설치해서 사용

1. 빌드 결과 앱을 한 번 실행합니다.

```sh
open safari/build/Debug/tabash.app
```

2. Safari에서 unsigned extension 허용을 켭니다.

- Safari > Settings > Advanced에서 `Show features for web developers`를 켭니다.
- Safari > Settings > Developer에서 `Allow unsigned extensions`를 켭니다.
- 이 설정은 Safari를 종료하면 초기화될 수 있습니다. Safari를 다시 열었을 때 확장이 보이지 않으면 다시 켜야 합니다.

3. 확장을 활성화합니다.

- Safari > Settings > Extensions에서 `tabash`를 체크합니다.
- 웹 사이트 접근 권한이 표시되면 command palette를 사용할 사이트에 대해 허용합니다.

4. 새 탭을 열어 tabash가 표시되는지 확인합니다.

## 임시 확장으로 빠르게 테스트

Xcode 컨테이너 앱 없이 web extension 폴더만 임시 로드할 수도 있습니다.

1. 먼저 빌드합니다.

```sh
npm --prefix safari/web-extension run build
```

2. Safari > Settings > Developer > `Add Temporary Extension...`을 선택합니다.
3. `safari/web-extension/dist` 폴더를 선택합니다.

Safari는 temporary extension을 24시간 후 또는 Safari 종료 시 제거합니다.

## 구현 메모

- Safari용 manifest는 `safari/web-extension/public/manifest.json`에 있습니다.
- `incognito` 키를 제거했고, command palette 사이트 접근을 위해 `host_permissions: ["<all_urls>"]`를 추가했습니다.
- MV3 `background.service_worker`, `chrome_url_overrides.newtab`, `content_scripts` 구조는 유지했습니다.
- Safari 전용 코드는 `safari/web-extension` 아래에만 있습니다.
- 원본 Chrome 확장 코드와 root `package.json`은 수정하지 않았습니다.

## 참고 문서

- https://developer.apple.com/documentation/safariservices/running-your-safari-web-extension
- https://developer.apple.com/documentation/safariservices/packaging-a-web-extension-for-safari
- https://developer.apple.com/documentation/safariservices/managing-safari-web-extension-permissions

## 문제 해결

### Allow unsigned extensions가 Safari 재시작 후 꺼짐

정상 동작입니다. Safari는 unsigned extension 허용 설정을 Safari 종료 시 초기화할 수 있습니다. 로컬 unsigned 빌드를 계속 쓸 때는 Safari를 새로 열 때마다 다시 켜야 합니다.

### 앱을 실행해도 Extensions 목록에 안 보임

먼저 다시 빌드합니다.

```sh
safari/scripts/build-local.sh
open safari/build/Debug/tabash.app
```

그래도 안 보이면 Safari를 완전히 종료한 뒤 다시 켜고, `Allow unsigned extensions`를 다시 활성화한 다음 Extensions 탭을 확인합니다.

등록 여부는 CLI에서도 확인할 수 있습니다.

```sh
pluginkit -m -A -p com.apple.Safari.web-extension | grep tabash
```

`dev.jiseop.tabash.Extension`이 보이면 macOS에는 등록된 상태이고, Safari Settings에서 unsigned extension 허용과 확장 활성화만 남은 상태입니다.
