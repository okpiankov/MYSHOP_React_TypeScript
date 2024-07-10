// redux-persist:
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, rootStore } from './store/store';

export const App = () => {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />;
      </PersistGate>
    </Provider>
  );
};

// Просто redux:
// import { Provider } from 'react-redux';
// import { rootStore } from './store/store';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './router/router';

// export const App = () => {
//   return (
//     <Provider store={rootStore}>
//       <RouterProvider router={router} />;
//     </Provider>
//   );
// };