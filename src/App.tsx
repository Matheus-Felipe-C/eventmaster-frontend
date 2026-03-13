import { Toaster } from 'react-hot-toast';
import '../src/css/App.css';
import { AppRouter } from './routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <Toaster position="bottom-right" />
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </>
    );
}

export default App;
