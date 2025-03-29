import AppProvider from 'hooks';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GlobalStyles } from 'styles';

import UnifiedLayout from 'components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Define as rotas que não devem ter layout
    const noLayoutRoutes = ['/', '/Login'];

    // Verifica se a rota atual não deve ter layout
    const shouldApplyLayout = !noLayoutRoutes.includes(router.pathname);

    return (
        <>
            <AppProvider>
                <GlobalStyles />
                {shouldApplyLayout ? (
                    <UnifiedLayout>
                        <Component {...pageProps} />
                    </UnifiedLayout>
                ) : (
                    <Component {...pageProps} />
                )}
            </AppProvider>
        </>
    );
}

export default MyApp;
