import React, { useState } from 'react';
import { useAuth } from './application/hooks/useAuth';
import { useProducts } from './application/hooks/useProducts';
import { Navbar } from './presentation/components/Navbar';
import { LoginPage } from './presentation/pages/LoginPage';
import { CatalogPage } from './presentation/pages/CatalogPage';
import { PosPage } from './presentation/pages/PosPage';
import { ReportsPage } from './presentation/pages/ReportsPage';

export const App: React.FC = () => {
    const { user, loading: authLoading, error: authError, login, logout, isAuthenticated } = useAuth();
    const { products, loading: prodLoading, error: prodError, refresh: refreshProducts, createProduct } = useProducts();
    const [currentTab, setCurrentTab] = useState<'catalog' | 'pos' | 'reports'>('catalog');

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-mono">
                Cargando Simple Stock Flow...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center">
                <LoginPage onLogin={login} loading={authLoading} error={authError} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <Navbar
                user={user}
                currentTab={currentTab}
                onSelectTab={(tab) => setCurrentTab(tab as any)}
                onLogout={logout}
            />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentTab === 'catalog' && (
                    <CatalogPage
                        products={products}
                        loading={prodLoading}
                        error={prodError}
                        onCreateProduct={createProduct}
                    />
                )}

                {currentTab === 'pos' && (
                    <PosPage
                        products={products}
                        userId={user?.id || 1}
                        onSaleSuccess={refreshProducts}
                    />
                )}

                {currentTab === 'reports' && <ReportsPage />}
            </main>
        </div>
    );
};

export default App;
