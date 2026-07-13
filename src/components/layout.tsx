import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import HomePage from "@/pages/index";
import LoanProductDetailPage from "@/pages/loan-product-detail";
import GlobalLoading from "@/components/global-loading";

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <GlobalLoading />
          <AnimationRoutes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/loan-product/:id" element={<LoanProductDetailPage />}></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;