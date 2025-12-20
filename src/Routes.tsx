import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ui/ScrollToTop";
import ErrorBoundary from "components/ui/ErrorBoundary";
import NotFound from "pages/NotFound";
import StoryFeedCommunity from './pages/story-feed-community';
import LoginRegister from './pages/login-register';
import LandingHome from './pages/landing-home';
import UserProfilePage from './pages/user-profile';
import TrekListing from './pages/trek-listing';
import TrekDetail from './pages/trek-detail';
import HotelGuideListingPage from "pages/hotel-guide-listing/page";
import HotelGuideDetailInteractive from "pages/hotel-guide-detail/components/HotelGuideDetailInteractive";
import StoryDetailPage from "pages/story-detail/Page";
import CreateStoryPage from "pages/create-story/page";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/story-feed-community" element={<StoryFeedCommunity />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/landing-home" element={<LandingHome />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/trek-listing" element={<TrekListing />} />
          <Route path="/trek-detail" element={<TrekDetail />} />
          <Route path="/hotel-guide-listing" element={<HotelGuideListingPage />} />
          <Route path="/hotel-guide-detail" element={<HotelGuideDetailInteractive data={null} />} />
          <Route path="/story-detail" element={<StoryDetailPage />} />
          <Route path="/create-story" element={<CreateStoryPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;