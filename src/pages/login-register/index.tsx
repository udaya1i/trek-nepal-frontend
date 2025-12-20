import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SocialLogin from "./components/SocialLogin";
import TrustSignals from "./components/TrustSignals";
import GuestAccessBanner from "./components/GuestAccessBanner";
import Image from "../../components/ui/AppImage";
import Header from "components/common/Header";

type AuthMode = "login" | "register";

const LoginRegister = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authMode]);

  return (
    <>
      <Helmet>
        <title>
          {authMode === "login" ? "Sign In" : "Create Account"} - Nepal Trek
          Explorer
        </title>
        <meta
          name="description"
          content="Join Nepal Trek Explorer community. Sign in to access personalized trek recommendations, save favorites, and connect with fellow trekkers." />

      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[60px]">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-elevated">
                    <Image
                      src="https://img.rocket.new/generatedImages/rocket_gen_img_10a3388b5-1764912207122.png"
                      alt="Trekkers hiking through scenic mountain trail with snow-capped peaks in background during golden hour"
                      className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h2 className="text-3xl font-bold mb-3">
                        Join Our Trekking Community
                      </h2>
                      <p className="text-lg opacity-90">
                        Connect with fellow adventurers, share experiences, and
                        discover Nepal's most breathtaking trails
                      </p>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-semibold text-lg mb-4">
                      Why Join Nepal Trek Explorer?
                    </h3>
                    <ul className="space-y-3">
                      {[
                      "Save and organize your favorite treks",
                      "Get personalized trek recommendations",
                      "Share your trekking stories and photos",
                      "Connect with experienced trekkers",
                      "Access exclusive community features",
                      "Receive real-time trail updates"].
                      map((benefit, index) =>
                      <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-success" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
                  <div className="border-b border-border">
                    <div className="flex">
                      <button
                        onClick={() => setAuthMode("login")}
                        className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 ${
                        authMode === "login" ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`
                        }>

                        Sign In
                      </button>
                      <button
                        onClick={() => setAuthMode("register")}
                        className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 ${
                        authMode === "register" ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`
                        }>

                        Create Account
                      </button>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold text-foreground mb-2">
                        {authMode === "login" ? "Welcome Back!" : "Start Your Journey"}
                      </h1>
                      <p className="text-muted-foreground">
                        {authMode === "login" ? "Sign in to access your account and continue exploring" : "Create an account to unlock all features and join our community"}
                      </p>
                    </div>

                    {authMode === "login" ?
                    <LoginForm
                      onSwitchToRegister={() => setAuthMode("register")} /> :


                    <RegisterForm
                      onSwitchToLogin={() => setAuthMode("login")} />

                    }

                    <div className="mt-6">
                      <SocialLogin />
                    </div>
                  </div>
                </div>

                <GuestAccessBanner />

                <TrustSignals />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default LoginRegister;