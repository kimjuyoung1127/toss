// granite.config.ts
import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 1. 앱인토스 콘솔에 등록한 고유 이름
  appName: 'mungai', 

  // 2. 토스 앱에 표시될 정보
  brand: {
      displayName: '멍멍 AI', // 사용자에게 보일 이름
      primaryColor: '#3182F6', // 토스 블루 (또는 브랜드 컬러)
      icon: 'https://your-server.com/icon-512.png',
      bridgeColorMode: 'basic'
  },

  // 3. 기존 React 프로젝트 설정 연결
  web: {
    host: 'localhost',
    port: 5173, // Vite의 기본 포트 (package.json과 동일하게)
    commands: {
      dev: 'vite',      // 'npm run dev' 실행 시 실제로 실행될 명령어
      build: 'vite build', // 'npm run build' 실행 시 명령어
    },
  },

  // 4. [중요] 우리 앱이 사용할 권한
  permissions: ['camera', 'photoAlbum'],
});