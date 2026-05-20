# shadcn/ui 초기화 안내

자동으로 `npx shadcn@latest init`을 실행할 수는 없으므로 로컬에서 아래 명령을 실행해주세요.

1) shadcn 초기화

```bash
npx shadcn@latest init
```

2) 필요한 컴포넌트 추가 예시

```bash
npx shadcn@latest add button card input dialog
```

3) 생성된 컴포넌트를 `components/ui/`로 이동하거나 통합하세요.

현재 레포지토리에는 `components/ui/`에 기본 스켈레톤이 추가되어 있습니다. 위 명령을 실행한 뒤 생성되는 스타일 토큰과 컴포넌트를 `app/` 페이지로 통합해 주세요.
