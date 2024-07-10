import { Outlet } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

export const LayoutAdmin = () => (
  <PageWrapper>
    <Outlet />
  </PageWrapper>
);
