export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "처음 만든 블로그 정리",
    content: "블로그를 시작하면서 가장 먼저 정리해야 했던 것들과, 꾸준히 글을 쓰기 위해 세운 최소한의 규칙을 적어두었습니다.",
    author: "김민수",
    date: "2026-05-20",
  },
  {
    id: 2,
    title: "개발 환경을 단순하게 유지하는 법",
    content: "도구가 많아질수록 생산성이 떨어질 수 있어서, 실제로 자주 쓰는 기능만 남기는 기준을 정리했습니다.",
    author: "이지은",
    date: "2026-05-18",
  },
  {
    id: 3,
    title: "책에서 얻은 아이디어를 기록하는 방법",
    content: "읽은 내용을 그냥 넘기지 않기 위해 핵심 문장, 질문, 적용 아이디어를 한 번에 남기는 메모 방식을 소개합니다.",
    author: "박서준",
    date: "2026-05-15",
  },
];
