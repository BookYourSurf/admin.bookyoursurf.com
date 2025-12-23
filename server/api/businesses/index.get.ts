import type { SurfBusiness } from '~/types/business'
import { SurfBusinessType } from '~/types/business'

const mockBusinesses: SurfBusiness[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Echo Beach',
    address: 'Echo Beach, Canggu, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.65,
      lng: 115.1333
    },
    aggregatedRating: {
      rating: 4.2,
      reviewCount: 127
    },
    image: '/images/surf-spots/echo-beach.jpg',
    description:
      'Echo Beach is one of Bali\'s most popular surf spots, known for its consistent waves and vibrant beach culture. Perfect for intermediate to advanced surfers, this black sand beach offers both left and right-hand breaks with waves that can reach up to 8 feet during peak season.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
    name: 'Canggu Surf Shop',
    address: 'Jl. Pantai Batu Bolong No. 8, Canggu, Bali',
    type: SurfBusinessType.SURF_SHOP,
    latLng: {
      lat: -8.649,
      lng: 115.131
    },
    aggregatedRating: {
      rating: 4.4,
      reviewCount: 89
    },
    image: '/images/surf-shops/canggu-surf-shop.jpg',
    description:
      'Canggu Surf Shop is your one-stop destination for all surf gear and accessories. We stock the latest boards from top brands, wetsuits, surf wax, and everything you need for your Bali surf adventure. Our knowledgeable staff can help you find the perfect board for your skill level.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
    name: 'Bali Surf Guide - Made',
    address: 'Canggu, Bali',
    type: SurfBusinessType.SURF_GUIDE,
    latLng: {
      lat: -8.65,
      lng: 115.13
    },
    aggregatedRating: {
      rating: 4.9,
      reviewCount: 156
    },
    image: '/images/surf-guides/made.jpg',
    description:
      'Made is a local surf guide with over 10 years of experience showing visitors the best waves around Canggu and beyond. Born and raised in Bali, he knows all the secret spots and can help you find the perfect wave for your skill level while sharing local surf culture and traditions.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'd4e5f6g7-h8i9-0123-def0-456789012345',
    name: 'Batu Bolong Beach',
    address: 'Batu Bolong Beach, Canggu, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.6489,
      lng: 115.1311
    },
    aggregatedRating: {
      rating: 4.5,
      reviewCount: 203
    },
    image: '/images/surf-spots/batu-bolong.jpg',
    description:
      'Batu Bolong Beach offers a perfect mix of beginner-friendly waves and challenging breaks for experienced surfers. This iconic spot features a distinctive rock formation and is known for its consistent surf conditions year-round, making it ideal for surfers of all levels.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'e5f6g7h8-i9j0-1234-ef01-567890123456',
    name: 'Bali Surf Coaching - Advanced',
    address: 'Canggu, Bali',
    type: SurfBusinessType.SURF_COACHING,
    latLng: {
      lat: -8.648,
      lng: 115.132
    },
    aggregatedRating: {
      rating: 4.8,
      reviewCount: 67
    },
    image: '/images/surf-coaching/advanced-coaching.jpg',
    description:
      'Our advanced surf coaching program is designed for experienced surfers looking to refine their technique and tackle bigger waves. Led by professional surf instructors, we focus on advanced maneuvers, wave reading, and performance optimization in challenging surf conditions.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'f6g7h8i9-j0k1-2345-f012-678901234567',
    name: 'Bali Surf Photography - Agung',
    address: 'Uluwatu, Bali',
    type: SurfBusinessType.PHOTOGRAPHY,
    latLng: {
      lat: -8.828,
      lng: 115.086
    },
    aggregatedRating: {
      rating: 4.7,
      reviewCount: 134
    },
    image: '/images/photography/agung.jpg',
    description:
      'Agung specializes in capturing the raw power and beauty of surfing in Uluwatu\'s legendary waves. With years of experience in surf photography, he creates stunning action shots and lifestyle images that perfectly capture your surfing moments against Bali\'s dramatic coastline.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'g7h8i9j0-k1l2-3456-0123-789012345678',
    name: 'Uluwatu Beach',
    address: 'Uluwatu Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.8294,
      lng: 115.085
    },
    aggregatedRating: {
      rating: 4.8,
      reviewCount: 312
    },
    image: '/images/surf-spots/uluwatu.jpg',
    description:
      'Uluwatu is Bali\'s most famous surf break, known for its powerful left-hand reef break and dramatic cliff-top setting. This world-class wave offers challenging conditions for advanced surfers, with consistent barrels and long rides that have made it a favorite among professional surfers worldwide.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'h8i9j0k1-l2m3-4567-1234-890123456789',
    name: 'Uluwatu Surf Shop',
    address: 'Jl. Labuan Sait, Uluwatu, Bali',
    type: SurfBusinessType.SURF_SHOP,
    latLng: {
      lat: -8.83,
      lng: 115.09
    },
    aggregatedRating: {
      rating: 4.7,
      reviewCount: 78
    },
    image: '/images/surf-shops/uluwatu-surf-shop.jpg',
    description:
      'Located near the famous Uluwatu surf break, our shop offers premium surf equipment and gear for serious surfers. We specialize in high-performance boards, reef booties, and all the essentials for tackling Uluwatu\'s challenging waves. Expert advice from local surfers included.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'i9j0k1l2-m3n4-5678-2345-901234567890',
    name: 'Uluwatu Surf Guide - Ketut',
    address: 'Uluwatu, Bali',
    type: SurfBusinessType.SURF_GUIDE,
    latLng: {
      lat: -8.83,
      lng: 115.08
    },
    aggregatedRating: {
      rating: 4.6,
      reviewCount: 92
    },
    image: '/images/surf-guides/ketut.jpg',
    description:
      'Ketut is a seasoned surf guide who knows every wave and secret spot around Uluwatu and the Bukit Peninsula. With his deep local knowledge and passion for surfing, he\'ll take you to the best breaks based on conditions and your skill level, ensuring an unforgettable surf experience.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'j0k1l2m3-n4o5-6789-3456-012345678901',
    name: 'Padang Padang Beach',
    address: 'Padang Padang Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.825,
      lng: 115.08
    },
    aggregatedRating: {
      rating: 4.6,
      reviewCount: 189
    },
    image: '/images/surf-spots/padang-padang.jpg',
    description:
      'Padang Padang Beach is famous for its perfect left-hand barrel that breaks over a shallow reef. This challenging wave is best suited for advanced surfers and is known for producing some of the most photogenic barrels in Bali. The wave is most consistent during the dry season.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'k1l2m3n4-o5p6-7890-4567-123456789012',
    name: 'Beginner Surf Lessons',
    address: 'Echo Beach, Canggu, Bali',
    type: SurfBusinessType.SURF_COACHING,
    latLng: {
      lat: -8.651,
      lng: 115.134
    },
    aggregatedRating: {
      rating: 4.5,
      reviewCount: 145
    },
    image: '/images/surf-coaching/beginner-lessons.jpg',
    description:
      'Perfect for first-time surfers, our beginner lessons focus on safety, basic techniques, and building confidence in the water. Our patient instructors will teach you proper paddling, popping up, and wave riding fundamentals in the gentle waves of Echo Beach, ensuring a fun and safe learning experience.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'l2m3n4o5-p6q7-8901-5678-234567890123',
    name: 'Canggu Surf Photography - Sari',
    address: 'Canggu, Bali',
    type: SurfBusinessType.PHOTOGRAPHY,
    latLng: {
      lat: -8.649,
      lng: 115.13
    },
    aggregatedRating: {
      rating: 4.3,
      reviewCount: 56
    },
    image: '/images/photography/sari.jpg',
    description:
      'Sari captures the essence of Canggu\'s surf culture through her lens, specializing in lifestyle and action photography. Her artistic approach combines the energy of surfing with the beauty of Bali\'s landscapes, creating memorable images that tell the story of your surf journey.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'm3n4o5p6-q7r8-9012-6789-345678901234',
    name: 'Bingin Beach',
    address: 'Bingin Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.82,
      lng: 115.075
    },
    aggregatedRating: {
      rating: 4.3,
      reviewCount: 167
    },
    image: '/images/surf-spots/bingin.jpg',
    description:
      'Bingin Beach offers a challenging left-hand reef break that rewards experienced surfers with perfect barrels and long rides. This powerful wave breaks over a shallow reef and requires good wave knowledge and positioning. The stunning cliff-top views make it one of Bali\'s most scenic surf spots.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'n4o5p6q7-r8s9-0123-7890-456789012345',
    name: 'Seminyak Surf Shop',
    address: 'Jl. Kayu Aya, Seminyak, Bali',
    type: SurfBusinessType.SURF_SHOP,
    latLng: {
      lat: -8.68,
      lng: 115.17
    },
    aggregatedRating: {
      rating: 4.2,
      reviewCount: 103
    },
    image: '/images/surf-shops/seminyak-surf-shop.jpg',
    description:
      'Located in the heart of Seminyak, our surf shop offers a wide selection of surfboards, accessories, and beachwear. We cater to both beginners and advanced surfers, with friendly staff ready to help you find the perfect gear for your Bali surf adventure. Free board advice included.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'o5p6q7r8-s9t0-1234-8901-567890123456',
    name: 'Dreamland Beach',
    address: 'Dreamland Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.815,
      lng: 115.07
    },
    aggregatedRating: {
      rating: 4.1,
      reviewCount: 98
    },
    image: '/images/surf-spots/dreamland.jpg',
    description:
      'Dreamland Beach offers a more relaxed surf experience with gentle waves perfect for beginners and intermediate surfers. This beautiful white sand beach provides a great learning environment with consistent, manageable waves and stunning views of the Bukit Peninsula coastline.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'p6q7r8s9-t0u1-2345-9012-678901234567',
    name: 'Sanur Surf Guide - Wayan',
    address: 'Sanur, Bali',
    type: SurfBusinessType.SURF_GUIDE,
    latLng: {
      lat: -8.69,
      lng: 115.26
    },
    aggregatedRating: {
      rating: 4.4,
      reviewCount: 74
    },
    image: '/images/surf-guides/wayan.jpg',
    description:
      'Wayan is a knowledgeable surf guide based in Sanur who specializes in taking surfers to the best breaks on Bali\'s east coast. With his local expertise and friendly personality, he\'ll help you discover hidden gems and ensure you catch the best waves during your stay.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'q7r8s9t0-u1v2-3456-0123-789012345678',
    name: 'Kuta Beach Surf Spot',
    address: 'Kuta Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.72,
      lng: 115.17
    },
    aggregatedRating: {
      rating: 3.8,
      reviewCount: 234
    },
    image: '/images/surf-spots/kuta.jpg',
    description:
      'Kuta Beach is Bali\'s most famous beach and a great spot for beginners to learn how to surf. The sandy bottom and gentle waves make it perfect for first-time surfers, while the long beach offers plenty of space to practice. It\'s also one of the most accessible surf spots on the island.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'r8s9t0u1-v2w3-4567-1234-890123456789',
    name: 'Intermediate Surf Coaching',
    address: 'Uluwatu, Bali',
    type: SurfBusinessType.SURF_COACHING,
    latLng: {
      lat: -8.831,
      lng: 115.084
    },
    aggregatedRating: {
      rating: 4.6,
      reviewCount: 81
    },
    image: '/images/surf-coaching/intermediate-coaching.jpg',
    description:
      'Our intermediate surf coaching program is designed for surfers who can catch waves and want to improve their technique and confidence. We focus on wave selection, turning techniques, and preparing you for more challenging surf conditions while building your skills progressively.',
    isActive: true,
    isApproved: true
  },
  {
    id: 's9t0u1v2-w3x4-5678-2345-901234567890',
    name: 'Legian Beach',
    address: 'Legian Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.71,
      lng: 115.16
    },
    aggregatedRating: {
      rating: 4.0,
      reviewCount: 112
    },
    image: '/images/surf-spots/legian.jpg',
    description:
      'Legian Beach offers a great mix of beginner and intermediate waves, making it perfect for surfers looking to progress their skills. The beach break provides consistent waves with a sandy bottom, making it safer for learning while still offering enough challenge for those looking to improve.',
    isActive: true,
    isApproved: true
  },
  {
    id: 't0u1v2w3-x4y5-6789-3456-012345678901',
    name: 'Bali Surf Photography - Komang',
    address: 'Canggu, Bali',
    type: SurfBusinessType.PHOTOGRAPHY,
    latLng: {
      lat: -8.647,
      lng: 115.129
    },
    aggregatedRating: {
      rating: 4.5,
      reviewCount: 63
    },
    image: '/images/photography/komang.jpg',
    description:
      'Komang specializes in capturing the vibrant surf culture of Canggu through his creative photography. His work combines action shots with lifestyle moments, creating a comprehensive visual story of your surfing experience in one of Bali\'s most popular surf destinations.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'u1v2w3x4-y5z6-7890-4567-123456789012',
    name: 'Nusa Dua Surf Academy',
    address: 'Nusa Dua, Bali',
    type: SurfBusinessType.SURF_COACHING,
    latLng: {
      lat: -8.78,
      lng: 115.24
    },
    aggregatedRating: {
      rating: 4.7,
      reviewCount: 98
    },
    image: '/images/surf-coaching/beginner-lessons.jpg',
    description:
      'Professional surf academy offering comprehensive surf education from beginner to advanced levels. Our certified instructors provide personalized coaching with modern teaching methods and safety protocols.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'v2w3x4y5-z6a7-8901-5678-234567890123',
    name: 'Jimbaran Surf Shop',
    address: 'Jl. Pantai Jimbaran, Jimbaran, Bali',
    type: SurfBusinessType.SURF_SHOP,
    latLng: {
      lat: -8.79,
      lng: 115.22
    },
    aggregatedRating: {
      rating: 4.3,
      reviewCount: 67
    },
    image: '/images/surf-shops/canggu-surf-shop.jpg',
    description:
      'Family-owned surf shop specializing in quality surf equipment and accessories. We offer board repairs, custom board shaping, and expert advice for surfers of all levels visiting Jimbaran Bay.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'w3x4y5z6-a7b8-9012-6789-345678901234',
    name: 'Medewi Beach',
    address: 'Medewi Beach, Bali',
    type: SurfBusinessType.SURF_SPOT,
    latLng: {
      lat: -8.55,
      lng: 114.95
    },
    aggregatedRating: {
      rating: 4.4,
      reviewCount: 156
    },
    image: '/images/surf-spots/echo-beach.jpg',
    description:
      'Medewi Beach is famous for its long left-hand point break, perfect for longboarders and intermediate surfers. This consistent wave offers long rides and is less crowded than other popular spots, making it ideal for those seeking a more relaxed surf experience.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'x4y5z6a7-b8c9-0123-7890-456789012345',
    name: 'Bali Surf Guide - Putu',
    address: 'Sanur, Bali',
    type: SurfBusinessType.SURF_GUIDE,
    latLng: {
      lat: -8.68,
      lng: 115.25
    },
    aggregatedRating: {
      rating: 4.8,
      reviewCount: 89
    },
    image: '/images/surf-guides/made.jpg',
    description:
      'Putu is an experienced surf guide specializing in east coast breaks and hidden gems around Sanur and Nusa Dua. With his local knowledge and friendly approach, he\'ll ensure you find the best waves and have an unforgettable surf experience.',
    isActive: true,
    isApproved: true
  },
  {
    id: 'y5z6a7b8-c9d0-1234-8901-567890123456',
    name: 'Bali Surf Photography - Dewa',
    address: 'Uluwatu, Bali',
    type: SurfBusinessType.PHOTOGRAPHY,
    latLng: {
      lat: -8.83,
      lng: 115.09
    },
    aggregatedRating: {
      rating: 4.6,
      reviewCount: 112
    },
    image: '/images/photography/agung.jpg',
    description:
      'Dewa specializes in capturing the raw power and beauty of Uluwatu\'s legendary waves. His artistic vision combines technical expertise with creative flair, producing stunning action shots and lifestyle images that perfectly capture your surfing moments.',
    isActive: true,
    isApproved: true
  }
]

export default defineEventHandler(() => {
  return mockBusinesses
})
