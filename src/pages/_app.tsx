import AppProvider from 'hooks';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GlobalStyles } from 'styles';

import { parseCookies } from 'nookies';
import AdminLayout from 'components/Layouts/AdminLayout';
import CompanyLayout from 'components/Layouts/CompanyLayout';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const cookies = parseCookies();
    const userType = cookies['@app:userType'];

    // Define as rotas que não devem ter layout
    const noLayoutRoutes = ['/', '/Login'];

    // Verifica se a rota atual não deve ter layout
    const shouldApplyLayout = !noLayoutRoutes.includes(router.pathname);

    // Define o layout com base no tipo de usuário, se necessário
    const Layout = userType === 'adm' ? AdminLayout : CompanyLayout;

    return (
        <>
            <AppProvider>
                <GlobalStyles />
                {shouldApplyLayout ? (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </AppProvider>
        </>
    );
}

export default MyApp;
