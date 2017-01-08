제1회 Electron 세미나에서 만든 앱 입니다.

node.js 설치되 환경에서
npm install -g electron

해당 프로젝트 폴더에서
npm init
npm install
electron .
입력하면 실행 됩니다.

배포 방법
프리빌드 바이너리 파일을 다운 받습니다.
https://github.com/electron/electron/releases
만들었던 앱 루트 폴더 이름을 app으로 변경합니다.
다운 받은 프리빌드 바이너리.zip 을 압축해제합니다.
압축 해제하여 생긴 폴더 내에 있는 resource 폴더로 app 폴더를 옳깁니다.
압축 해제하여 생긴 폴더 내에 있는 electron.exe 파일을 실행합니다.

/*electron.exe로 실행할 경우 root 폴더가 프리빌드 바이너리 폴더입니다.  그래서 상대경로를 사용하게 될 경우 에러가 발생할 수 있습니다.*/

부산 자바스크립트(부자) 모임 있어요.
이메일 sumel014@naver.con
