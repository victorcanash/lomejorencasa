import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppContext } from '@lib/contexts/AppContext';

const usePage = () => {
  const { setLoading } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setLoading(false);  
  }, [router.asPath, setLoading]);

  return {};
};

export default usePage;
