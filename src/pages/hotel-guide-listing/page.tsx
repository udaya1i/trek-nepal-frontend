import type { Metadata } from 'next';
import Header from 'components/common/Header';
import BreadcrumbTrail from 'components/common/BreadcrumbTrail';
import HotelGuideListingInteractive from './components/HotelGuideListingInteractive';

export const metadata: Metadata = {
    title: 'Hotels & Guides - Nepal Trek Explorer',
    description: 'Discover verified accommodations and expert local guides for your Nepal trekking adventure. Filter by location, price, amenities, and ratings to find the perfect services for your journey.',
};

export default function HotelGuideListingPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <div className="mx-4 lg:mx-16 py-6">
                    <BreadcrumbTrail />
                    <div className="mb-8">
                        <h1 className="mb-3">Hotels & Guides</h1>
                        <p className="text-muted-foreground max-w-3xl">
                            Find verified accommodations and experienced local guides for your trekking adventure. All providers are carefully vetted to ensure quality and safety.
                        </p>
                    </div>
                </div>
                <HotelGuideListingInteractive />
            </main>
        </>
    );
}