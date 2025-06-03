import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Reviews = () => {
  // Sample review data - in a real app, this would come from an API
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      date: '2025-05-15',
      text: 'I absolutely love shopping here! The products are high quality and the customer service is exceptional. The website is so easy to navigate and my orders always arrive on time.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 4,
      date: '2025-05-10',
      text: 'Great selection of electronics at competitive prices. The detailed product descriptions helped me make informed decisions. Will definitely shop here again!'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Fashion Blogger',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      date: '2025-05-08',
      text: 'As someone who cares about style, I appreciate the curated collection of clothing items. Everything I\'ve purchased has exceeded my expectations in terms of quality and design.'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Home Decorator',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4,
      date: '2025-05-05',
      text: 'The home decor items are unique and well-crafted. I\'ve received many compliments on the pieces I\'ve purchased from this store. Shipping was fast and everything arrived well-packaged.'
    },
    {
      id: 5,
      name: 'Olivia Taylor',
      role: 'Fitness Instructor',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      rating: 5,
      date: '2025-04-28',
      text: 'I bought several fitness products and they\'ve been essential to my workout routine. The quality is outstanding and the prices are reasonable. The customer support team was also very helpful when I had questions.'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={18}
            fill={i < rating ? "#FFB800" : "none"}
            stroke={i < rating ? "#FFB800" : "#CBD5E0"}
            className="mr-1"
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
          <p className="text-gray-600">See what our customers have to say about their experience</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 flex-grow">{review.text}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <span className="text-primary font-medium">Verified Purchase</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="mt-8 text-center">
          <button className="bg-white border-2 border-primary text-black font-semibold px-8 py-3 rounded-full hover:bg-primary transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
