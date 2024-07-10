import { Outlet } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

export const LayoutСabinet = () => (
  <PageWrapper>
    <Outlet />
  </PageWrapper>
);
