import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
          <Icon name="Mountain" size={40} className="text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of trekkers who have discovered their perfect Himalayan journey with us. Create your account today and unlock exclusive features.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => navigate('/login-register')}
            className="bg-white text-primary hover:bg-white/90 min-w-[200px]"
          >
            Create Account
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Mountain"
            iconPosition="left"
            onClick={() => navigate('/trek-listing')}
            className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
          >
            Browse Treks
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Verified Information</h3>
              <p className="text-sm text-white/80">All treks and guides are thoroughly verified for your safety</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Community Support</h3>
              <p className="text-sm text-white/80">Connect with experienced trekkers and local experts</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Detailed Routes</h3>
              <p className="text-sm text-white/80">Access comprehensive maps and itineraries for every trek</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;