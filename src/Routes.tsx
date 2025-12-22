import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ui/ScrollToTop";
import ErrorBoundary from "components/ui/ErrorBoundary";
import NotFound from "components/NotFound";
import StoryFeedCommunity from './public/story-feed-community';
import LoginRegister from './public/login-register';
import LandingHome from './public/landing-home';
import UserProfilePage from './public/user-profile';
import TrekListing from './public/trek-listing';
import TrekDetail from './public/trek-detail';
import HotelGuideListingPage from "public/hotel-guide-listing/page";
import HotelGuideDetailInteractive from "public/hotel-guide-detail/components/HotelGuideDetailInteractive";
import StoryDetailPage from "public/story-detail/Page";
import CreateStoryPage from "public/create-story/page";
import AdminLogin from "admin/admin-login";
import AdminDashboard from "admin/admin-dashboard";
import UserManagement from "admin/user-management";
import SafetyManagement from "admin/safety-management";
import TrekManagement from "admin/trek-management";
import AddTrek from "admin/add-trek";
import ContentModeration from "admin/content-moderation";

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
          <Route path="/hotel-guide-detail" element={<HotelGuideDetailInteractive />} />
          <Route path="/story-detail/:id" element={<StoryDetailPage />} />
          <Route path="/create-story" element={<CreateStoryPage />} />

          {/* <Route path="/" element={<AdminLogin />} /> */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/safety-management" element={<SafetyManagement />} />
          <Route path="/trek-management" element={<TrekManagement />} />
          <Route path="/content-moderation" element={<ContentModeration/>} />
          <Route path="/add-trek" element={<AddTrek />} />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;