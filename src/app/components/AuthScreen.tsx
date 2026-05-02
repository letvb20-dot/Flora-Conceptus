import { useState } from 'react';
import { Flower2, Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';

interface Props {
  onAuthenticated: () => void;
}

type Mode = 'login' | 'signup';

const passwordRules = [
  { label: '1 letra maiúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 letra minúscula', test: (p: string) => /[a-z]/.test(p) },
  { label: '1 caractere especial', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  { label: 'até 8 caracteres', test: (p: string) => p.length > 0 && p.length <= 8 },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export function AuthScreen({ onAuthenticated }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validPassword = passwordRules.every((r) => r.test(password));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Informe seu e-mail.');
    if (mode === 'signup' && (!name || !phone)) return setError('Preencha todos os campos.');
    if (!validPassword) return setError('A senha não atende aos requisitos.');
    onAuthenticated();
  };

  const inputClass =
    'w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none';
  const inputStyle = {
    borderBottom: '1px solid var(--border)',
    color: 'var(--foreground)',
    fontFamily: 'serif',
  };

  return (
    <div
      className="flex items-stretch"
      style={{ backgroundColor: 'var(--background)', minHeight: '520px' }}
    >
      {/* Left decorative panel */}
      <div
        className="hidden md:flex flex-col justify-between px-12 py-12 flex-1"
        style={{ backgroundColor: 'var(--flora-primary-dark)' }}
      >
        <div className="flex items-center gap-3">
          <Flower2 className="w-6 h-6" style={{ color: 'var(--flora-primary)' }} />
          <span
            className="text-xl text-white"
            style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
          >
            Flora Conceptus
          </span>
        </div>
        <div>
          <h2
            className="text-4xl text-white leading-tight mb-4"
            style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
          >
            Uma enciclopédia<br />das flores do mundo.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Explore origens, simbolismos e histórias de espécies fascinantes
            — da delicada sakura à imponente vitória-régia amazônica.
          </p>
          <div className="flex gap-10">
            {[
              { value: '35+', label: 'Espécies' },
              { value: '6', label: 'Continentes' },
              { value: '∞', label: 'Histórias' },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-2xl text-white"
                  style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
                >
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2026 Flora Conceptus
        </p>
      </div>

      {/* Right form panel */}
      <div
        className="w-full md:w-[400px] flex-shrink-0 flex flex-col bg-card overflow-y-auto"
        style={{ borderLeft: '1px solid var(--border)' }}
      >
        {/* Form header */}
        <div className="px-8 pt-10 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-1 mb-1">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className="flex-1 pb-2 text-sm transition-colors text-center"
                style={{
                  color: mode === m ? 'var(--flora-primary-dark)' : 'var(--muted-foreground)',
                  borderBottom: mode === m
                    ? '2px solid var(--flora-primary)'
                    : '2px solid transparent',
                  fontFamily: 'Kaisei Opti, serif',
                }}
              >
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 py-8 flex-1">
          {/* Google */}
          <button
            onClick={onAuthenticated}
            className="w-full flex items-center justify-center gap-3 py-2.5 mb-6 text-sm transition-colors"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              fontFamily: 'serif',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--muted)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '')
            }
          >
            <GoogleIcon />
            {mode === 'login' ? 'Entrar com Google' : 'Cadastrar com Google'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>ou</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="relative">
                <User
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'var(--muted-foreground)' }}
                />
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--muted-foreground)' }}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <Phone
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'var(--muted-foreground)' }}
                />
                <input
                  type="tel"
                  placeholder="Celular (com DDD)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            )}

            <div className="relative">
              <Lock
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--muted-foreground)' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                maxLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + ' pr-8'}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {(mode === 'signup' || password.length > 0) && (
              <ul className="text-xs space-y-1">
                {passwordRules.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li
                      key={r.label}
                      style={{ color: ok ? 'var(--flora-primary)' : 'var(--muted-foreground)' }}
                    >
                      {ok ? '✓' : '○'} {r.label}
                    </li>
                  );
                })}
              </ul>
            )}

            {error && (
              <p className="text-xs" style={{ color: 'var(--destructive)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--flora-primary-dark)' }}
            >
              {mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: 'var(--muted-foreground)' }}>
            {mode === 'login' ? 'Novo por aqui? ' : 'Já tem uma conta? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="underline"
              style={{ color: 'var(--flora-primary)' }}
            >
              {mode === 'login' ? 'Crie sua conta' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}