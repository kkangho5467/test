export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-12">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Blog Intro
        </p>
        <h1 className="text-3xl font-bold text-zinc-900">홍길동</h1>
        <div className="mt-6 space-y-3 text-base leading-7 text-zinc-700">
          <p>
            <span className="font-semibold text-zinc-900">학교:</span> 한국대학교
          </p>
          <p>
            <span className="font-semibold text-zinc-900">전공:</span> 컴퓨터공학
          </p>
          <p>
            <span className="font-semibold text-zinc-900">취미:</span> 독서, 산책, 블로그 글쓰기
          </p>
        </div>
      </section>
    </main>
  );
}
