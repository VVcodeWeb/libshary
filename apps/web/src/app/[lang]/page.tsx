import SignInButton from '@web/components/auth/SignInButton';
import { redirect } from '@web/lib/i18n/routing';
import { authOptions } from '@web/lib/auth/auth-config';
import { getServerSession } from 'next-auth';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const t = await getTranslations('landing');

  if (session) {
    redirect({ href: '/home', locale });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{t('welcome')}</h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <SignInButton />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
