import '../styles/globals.css'
import  "../styles/CountryCard.css"; // todo：cssモジュールに変換する
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider> 
  )  
}

export default MyApp
