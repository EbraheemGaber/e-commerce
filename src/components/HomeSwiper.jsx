import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HomeSwiper = () => {
  // Updated banner images with yellow-themed images
  const bannerImages = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
      title: "Summer Collection",
      subtitle: "Discover the latest trends for this season",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2058&auto=format&fit=crop",
      title: "New Arrivals",
      subtitle: "Check out our newest products",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
      title: "Special Offers",
      subtitle: "Limited time discounts on selected items",
    },
  ];

  return (
    <section id="home" className="h-[90vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                <button className="bg-primary text-black font-semibold px-8 py-3 rounded-full hover:bg-accent transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSwiper;
