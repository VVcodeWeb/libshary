import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@web/providers/AuthProvider';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { authOptions } from '@web/lib/auth/auth-config';
import { ThemeProvider } from '@web/providers/ThemeProvider';
import { ToastProvider } from '@web/providers/ToastProvider';
import { ModalProvider } from '@web/providers/ModalProvider';
import ApolloProvider from '@web/providers/ApolloProvider';
import { isValidLocale } from '@libshary/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Libshary',
  description: 'Virtual library',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const session = await getServerSession(authOptions);
  const locale = (await params).lang;
  const apiUrl = process.env.API_URL as string;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider session={session}>
            <ApolloProvider apiUrl={apiUrl}>
              <ThemeProvider>
                <ModalProvider>
                  <ToastProvider>{children}</ToastProvider>
                </ModalProvider>
              </ThemeProvider>
            </ApolloProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
