import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession } from '../lib/session'

export default function LoginPage() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const goMain = () => {
    createSession()
    navigate('/main', { replace: true })
  }

  const handleIdPwLogin = (e: FormEvent) => {
    e.preventDefault()
    if (!userId.trim() || !password.trim()) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }
    goMain()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8 sm:px-8">
        <section className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 backdrop-blur sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Cosmoslog Access Terminal</p>
            <h1 className="mt-4 text-2xl font-semibold leading-tight sm:text-4xl">
              Space Station Crew
              <br />
              Identity Check
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:mt-4">
              승무원 인증이 완료되면 개인 로그 스테이션으로 이동합니다. 현재는 샘플 단계이므로
              인증 수단을 선택하면 메인 페이지로 진입합니다.
            </p>

            <form onSubmit={handleIdPwLogin} className="mt-6 space-y-3">
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Crew ID"
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                ID/PW로 로그인
              </button>
            </form>

            <div className="my-5 h-px bg-slate-700/70" />

            <div className="space-y-2">
              <button
                type="button"
                onClick={goMain}
                className="w-full rounded-xl border border-slate-500/60 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Google 계정으로 로그인
              </button>
              <button
                type="button"
                onClick={goMain}
                className="w-full rounded-xl border border-slate-500/60 bg-slate-950/70 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                Apple 계정으로 로그인
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_20px_50px_-20px_rgba(34,211,238,0.5)] sm:p-6">
            <div className="rounded-xl border border-slate-600/50 bg-slate-950/70 p-5 font-mono">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Crew ID Card</p>
              <div className="mt-5 space-y-2 text-sm">
                <p className="text-slate-400">Station</p>
                <p className="text-cyan-100">ORBITAL ARCHIVE UNIT · C-17</p>
                <p className="mt-4 text-slate-400">Access Scope</p>
                <p className="text-cyan-100">LOG_WRITE / LOG_READ / DRAFT_SYNC</p>
                <p className="mt-4 text-slate-400">Auth Methods</p>
                <p className="text-cyan-100">ID-PW / Google / Apple</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}