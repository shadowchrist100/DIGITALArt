import Hero from '../../components/Home/Hero';
import SearchSection from '../../components/Home/SearchSection';
import CategoriesGrid from '../../components/Home/CategoriesGrid';
import HowItWorks from '../../components/Home/HowItWorks';
import FeaturedArtisans from '../../components/Home/FeaturedArtisans';
import CTASection from '../../components/Home/CTASection';

export default function Home() {
  return (
    <div>
      <Hero />
      <SearchSection />
      <CategoriesGrid />
      <HowItWorks />
      <FeaturedArtisans />
      <CTASection />
    </div>
  );
}