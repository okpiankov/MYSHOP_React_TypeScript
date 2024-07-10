import { Outlet } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

export const RootComponent = () => (
  <PageWrapper>
    <Outlet />
  </PageWrapper>
);
