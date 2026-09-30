import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Wallet } from 'lucide-react';

type AuthUser = {
  name: string;
  email: string;
  password: string;
};

type AuthPageProps = {
  onAuthenticated: (user: AuthUser) => void;
};

export type { AuthUser };

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password || (mode === 'signup' && !name.trim())) {
      setError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      const user = { name: name.trim(), email: normalizedEmail, password };
      localStorage.setItem('finflow_user', JSON.stringify(user));
      onAuthenticated(user);
      return;
    }

    const savedUser = localStorage.getItem('finflow_user');
    const user = savedUser ? JSON.parse(savedUser) as AuthUser : null;

    if (!user || user.email !== normalizedEmail || user.password !== password) {
      setError('Email or password is incorrect. Please sign up first if you are new.');
      return;
    }

    onAuthenticated(user);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-emerald-500 to-cyan-600 p-10 text-slate-950 lg:flex">
          <div>
            <div className="flex items-center gap-3 text-xl font-black">
              <div className="rounded-xl bg-slate-950/15 p-2"><Wallet className="h-6 w-6" /></div>
              FinFlow Tracker
            </div>
            <h1 className="mt-24 max-w-md text-5xl font-black leading-tight">Your money, clearly in view.</h1>
            <p className="mt-5 max-w-md text-base font-medium leading-7 text-slate-950/75">
              Track income, understand spending, and build better financial habits from one calm workspace.
            </p>
          </div>
          <div className="space-y-3 text-sm font-semibold">
            <p className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Simple transaction tracking</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Live budget insights</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Private personal dashboard</p>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3 text-xl font-black text-emerald-400"><Wallet className="h-6 w-6" /> FinFlow Tracker</div>
          </div>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">Welcome</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h2>
            <p className="mt-2 text-sm text-slate-400">{mode === 'login' ? 'Continue managing your finances.' : 'Start building a clearer view of your money.'}</p>
          </div>

          <div className="mb-7 grid grid-cols-2 border-b border-slate-700">
            <button type="button" onClick={() => switchMode('login')} className={`border-b-2 pb-3 text-sm font-semibold transition ${mode === 'login' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Log in</button>
            <button type="button" onClick={() => switchMode('signup')} className={`border-b-2 pb-3 text-sm font-semibold transition ${mode === 'signup' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Sign up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <label className="block text-sm font-medium text-slate-300">Full name
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" placeholder="Ahmed Khan" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
              </label>
            )}
            <label className="block text-sm font-medium text-slate-300">Email address
              <span className="relative mt-2 block"><Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" /></span>
            </label>
            <label className="block text-sm font-medium text-slate-300">Password
              <span className="relative mt-2 block"><LockKeyhole className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" /><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 6 characters" className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-12 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-2.5 rounded-lg p-1.5 text-slate-500 hover:text-slate-200">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></span>
            </label>
            {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900">{mode === 'login' ? 'Log in' : 'Create account'} <ArrowRight className="h-5 w-5" /></button>
          </form>
        </section>
      </div>
    </main>
  );
}
