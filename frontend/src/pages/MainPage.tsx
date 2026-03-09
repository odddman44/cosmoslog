import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '../lib/session'
import { applyTheme, getTheme } from '../lib/theme'

type Post = {
  id: string
  title: string
  excerpt: string
  tags: string[]
  updatedAtLabel: string
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '첫 번째 초안',
    excerpt: 'Cosmoslog의 방향과 “작가 친화적”이 무엇인지에 대한 메모.',
    tags: ['일기'],
    updatedAtLabel: '2일 전',
  },
  {
    id: '2',
    title: '에디터 아이디어',
    excerpt: '툴바 미니멀리즘, 모바일 조작성, 긴 글 안정성에 대한 정리.',
    tags: ['아이디어'],
    updatedAtLabel: '5일 전',
  },
  {
    id: '3',
    title: 'SSO 연동 메모',
    excerpt: '실제 배포 경험 기반 체크리스트와 흔한 함정들.',
    tags: ['개발'],
    updatedAtLabel: '1주 전',
  },
]

export default function MainPage() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold tracking-tight">Cosmoslog</div>
            <div className="hidden text-xs text-slate-500 dark:text-slate-300 sm:block">Your quiet writing space</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
              검색
            </button>
            <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">
              + 새 글
            </button>
            <button
              type="button"
              onClick={handleThemeToggle}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'light' ? '다크모드' : '라이트모드'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(76,110,245,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(132,94,247,0.14),transparent_50%),radial-gradient(700px_circle_at_50%_110%,rgba(76,110,245,0.10),transparent_55%)]" />
          <div className="h-full w-full bg-[radial-gradient(2px_2px_at_20%_30%,rgba(0,0,0,0.06),transparent_60%),radial-gradient(1.5px_1.5px_at_70%_25%,rgba(0,0,0,0.05),transparent_60%),radial-gradient(1.5px_1.5px_at_40%_70%,rgba(0,0,0,0.05),transparent_60%),radial-gradient(2px_2px_at_85%_80%,rgba(0,0,0,0.05),transparent_60%)] opacity-70 dark:opacity-40" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              코스모스 테마 · {theme === 'light' ? '라이트 모드' : '다크 모드'}
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">오늘은 어떤 이야기를 남길까?</h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              웹과 모바일에서 모두 편하게 - 방해 요소 없이, 긴 글도 안정적으로 쓸 수 있는 공간.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">새 글 쓰기</button>
              <button className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
                마지막 초안 이어쓰기
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 pb-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-semibold">최근 글</h2>
              <div className="text-sm text-slate-500 dark:text-slate-300">최근 수정 순</div>
            </div>

            <div className="mt-4 grid gap-3">
              {mockPosts.map((p) => (
                <article
                  key={p.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
                >
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.excerpt}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                    <div className="flex gap-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 dark:border-slate-600 dark:bg-slate-800"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span>·</span>
                    <span>{p.updatedAtLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">이어서 쓰기</h3>
              <div className="mt-3 grid gap-2">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-left hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
                  <div className="font-medium">제목 없음</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">어제</div>
                </button>
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-left hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
                  <div className="font-medium">스키마 아이디어</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">3일 전</div>
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold">태그</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {['일기', '아이디어', '개발', '소설', '에세이'].map((t) => (
                  <button
                    key={t}
                    className="rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}