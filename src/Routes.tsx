import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StoryFeedCommunity from './pages/story-feed-community';
import LoginRegister from './pages/login-register';
import LandingHome from './pages/landing-home';
import UserProfilePage from './pages/user-profile';
import TrekListing from './pages/trek-listing';
import TrekDetail from './pages/trek-detail';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/story-feed-community" element={<StoryFeedCommunity />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/landing-home" element={<LandingHome />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/trek-listing" element={<TrekListing />} />
        <Route path="/trek-detail" element={<TrekDetail />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
