const products = [
    {
      name: 'Floral Print Maxi Dress',
      price: 89.99,
      originalPrice: 119.99,
      description: 'A beautiful floral print maxi dress perfect for summer occasions. Made with lightweight, breathable fabric.',
      images: [
        'https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/7691170/pexels-photo-7691170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'women',
      subCategory: 'dresses',
      tags: ['summer', 'floral', 'maxi dress'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Blue', value: '#92b9e3' },
        { name: 'Pink', value: '#f8c3cb' }
      ],
      rating: 4.5,
      reviewCount: 24,
      isNew: true,
      isSale: true,
      countInStock: 15,
      isRentable: true,
      rentalPrices: {
        three_days: 18.00,
        five_days: 27.00,
        week: 36.00
      }
    },
    {
      name: 'Tailored Slim Fit Blazer',
      price: 149.99,
      description: 'A classic tailored slim fit blazer that adds sophistication to any outfit. Made with premium materials for comfort and durability.',
      images: [
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'men',
      subCategory: 'blazers',
      tags: ['formal', 'office', 'blazer'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Navy', value: '#141a30' }
      ],
      rating: 4.8,
      reviewCount: 16,
      isNew: true,
      isSale: false,
      countInStock: 8,
      isRentable: true,
      rentalPrices: {
        three_days: 30.00,
        five_days: 45.00,
        week: 60.00
      }
    },
    {
      name: 'Embroidered Cotton Kurta',
      price: 69.99,
      originalPrice: 89.99,
      description: 'An elegant embroidered cotton kurta with intricate detailing. Perfect for both casual and festive occasions.',
      images: [
        'https://images.pexels.com/photos/10331742/pexels-photo-10331742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/10508428/pexels-photo-10508428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'women',
      subCategory: 'ethnic',
      tags: ['ethnic', 'embroidered', 'kurta'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', value: '#ffffff' },
        { name: 'Teal', value: '#2a7e7e' }
      ],
      rating: 4.7,
      reviewCount: 32,
      isNew: false,
      isSale: true,
      countInStock: 20,
      isRentable: true,
      rentalPrices: {
        three_days: 14.00,
        five_days: 21.00,
        week: 28.00
      }
    },
    {
      name: 'Leather Crossbody Bag',
      price: 129.99,
      description: 'A stylish leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday use.',
      images: [
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'accessories',
      subCategory: 'bags',
      tags: ['leather', 'crossbody', 'bag'],
      colors: [
        { name: 'Brown', value: '#794c31' },
        { name: 'Black', value: '#000000' }
      ],
      rating: 4.6,
      reviewCount: 19,
      isNew: true,
      isSale: false,
      countInStock: 12,
      isRentable: false
    },
    {
      name: 'Linen Blend Summer Shirt',
      price: 59.99,
      originalPrice: 79.99,
      description: 'A lightweight linen blend shirt perfect for summer. Features a relaxed fit and breathable fabric.',
      images: [
        'https://images.pexels.com/photos/6310924/pexels-photo-6310924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6311381/pexels-photo-6311381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'men',
      subCategory: 'shirts',
      tags: ['summer', 'linen', 'casual'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', value: '#ffffff' },
        { name: 'Blue', value: '#a1c3d9' }
      ],
      rating: 4.3,
      reviewCount: 28,
      isNew: false,
      isSale: true,
      countInStock: 25,
      isRentable: true,
      rentalPrices: {
        three_days: 12.00,
        five_days: 18.00,
        week: 24.00
      }
    },
    {
      name: 'Statement Gold Earrings',
      price: 49.99,
      description: 'Elegant statement gold earrings that add a touch of glamour to any outfit. Perfect for special occasions.',
      images: [
        'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/9428261/pexels-photo-9428261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'accessories',
      subCategory: 'jewelry',
      tags: ['gold', 'earrings', 'statement'],
      rating: 4.9,
      reviewCount: 15,
      isNew: true,
      isSale: false,
      countInStock: 10,
      isRentable: false
    },
    {
      name: 'High-Waisted Palazzo Pants',
      price: 79.99,
      description: 'Stylish high-waisted palazzo pants with a flowy silhouette. Comfortable and versatile for various occasions.',
      images: [
        'https://images.pexels.com/photos/7691087/pexels-photo-7691087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/7691064/pexels-photo-7691064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'women',
      subCategory: 'pants',
      tags: ['palazzo', 'high-waisted', 'formal'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Beige', value: '#e8dcca' }
      ],
      rating: 4.4,
      reviewCount: 22,
      isNew: false,
      isSale: false,
      countInStock: 18,
      isRentable: true,
      rentalPrices: {
        three_days: 16.00,
        five_days: 24.00,
        week: 32.00
      }
    },
    {
      name: 'Classic Leather Watch',
      price: 199.99,
      originalPrice: 249.99,
      description: 'A timeless classic leather watch with stainless steel case. Water-resistant and durable for everyday wear.',
      images: [
        'https://images.pexels.com/photos/9978724/pexels-photo-9978724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      category: 'accessories',
      subCategory: 'watches',
      tags: ['leather', 'watch', 'classic'],
      colors: [
        { name: 'Brown', value: '#794c31' },
        { name: 'Black', value: '#000000' }
      ],
      rating: 4.7,
      reviewCount: 31,
      isNew: false,
      isSale: true,
      countInStock: 7,
      isRentable: false
    }
  ];
  
  export default products;