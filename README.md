# CK_ChatClient
## 0. Project Info
### Beginning
청강문화산업대학교 1학년 2학기 게임네트워크기초 기말과제 (채팅 프로그램 구현하기)
### Contributor
- Server: [Junseo Lee (Alice-in-November)](https://github.com/Alice-inNovember)
- Client: [KangHyeon Kim (HwaHyang)](https://github.com/hwahyang1)
### Tech Stack
- Node.js(TypeScript)
- Vue.js + Electron.js ([Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/))
### Platform
- Windows
- Linux
- MacOS (Not Tested)
### Server
See [Alice-inNovember/CK_ChatServer](https://github.com/Alice-inNovember/CK_ChatServer).

## 1. Build
Run this on your build target (OS).
### Environment
Node.js 16.x **(RECOMMENDED)**
### clone
```
git clone https://github.com/hwahyang1/CK_ChatClient.git --depth=1
```
### install
```
npm ci -D
```
### configure (Node.js 17+)
```
export NODE_OPTIONS=--openssl-legacy-provider
```
### test
```
npm run electron:serve
```
### build
```
npm run electron:build
```
### deploy
Now, your client is in `./dist_electron`(or, `./electron_dist`)!

## 2. Why Vue.js + Electron.js?
초기에는 '플랫폼에 구애받지 않는 채팅 클라이언트'를 목표로, CSR 프레임워크 중 하나인 Vue.js를 사용하려 하였다.

그러나, 웹브라우저 상에서 `net` 패키지를 활용하여 Socket 통신을 하는 것이 불가능에 가까웠고, Electron.js의 구조를 빌려 Socket 통신을 구현하게 되었다.

## 3. LICENSE
GPLv3
