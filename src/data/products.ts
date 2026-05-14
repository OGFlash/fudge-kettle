import { Product, ProductOption } from '../types/shop';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED FLAVOR LISTS
// Update these arrays to change flavor choices across all products at once.
// ─────────────────────────────────────────────────────────────────────────────

const FUDGE_FLAVORS = [
  'Chocolate',
  'Peanut Butter',
  'Maple Walnut',
  'Cookies & Cream',
  'Salted Caramel',
];

const FREEZE_DRIED_VARIETIES = [
  'Red Hots',
  'Skittles',
  'Jolly Ranchers',
  'Peach Rings',
  'Gummy Bears',
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: SIZE OPTION
// Creates a size dropdown with prices. Add or remove sizes as needed.
// Usage: sizeOption({ 'Half Pound': 12.99, 'One Pound': 22.99 })
// ─────────────────────────────────────────────────────────────────────────────

function sizeOption(prices: Record<string, number>): ProductOption {
  return {
    name: 'Size',
    type: 'dropdown',
    required: true,
    values: Object.keys(prices),
    prices,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
//
// HOW TO ADD A PRODUCT:
//   1. Copy an existing product block and paste it at the end of the array.
//   2. Give it a unique id (next number) and a unique slug (URL-friendly name).
//   3. Set the image path — drop the .jpg into /images/ and run:
//        cp images/yourfile.jpg public/yourfile.jpg
//   4. Fill in name, price, description, category, and options.
//
// CATEGORIES: 'fudge' | 'candy' | 'gifts'
// TAGS (optional, any combo): 'bestseller' | 'gift-ready' | 'seasonal' | 'new' | 'events'
// limitedEdition: true  →  shows a "Limited Edition" badge
//
// HOW TO HIDE A PRODUCT: delete its block or add  active: false  (see type file)
// HOW TO CHANGE A PRICE: update the `price` field, or the `prices` map in sizeOption()
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [

  // ── FUDGE ──────────────────────────────────────────────────────────────────

  {
    id: '1',
    slug: 'classic-fudge-trio',
    name: 'Classic Fudge Trio',
    price: 24.99,                          // flat price — no size option
    images: ['/fudge.jpg'],
    description: 'Three half-pound pieces of our most beloved fudge flavors. Choose your perfect combination from our handmade selection — made fresh in small batches right here in Avon.',
    tags: ['bestseller', 'gift-ready'],
    category: 'fudge',
    limitedEdition: false,
    options: [
      { name: 'Fudge Flavor Choice #1', type: 'single', required: true, values: FUDGE_FLAVORS },
      { name: 'Fudge Flavor Choice #2', type: 'single', required: true, values: FUDGE_FLAVORS },
      { name: 'Fudge Flavor Choice #3', type: 'single', required: true, values: FUDGE_FLAVORS },
    ],
  },

  {
    id: '2',
    slug: 'signature-chocolate-fudge',
    name: 'Signature Chocolate Fudge',
    price: 12.99,                          // starting / default price
    images: ['/fudge3.jpg'],
    description: 'Our classic chocolate fudge made with premium cocoa and real butter. Rich, creamy, and utterly irresistible. A Fudge Kettle staple since day one.',
    tags: ['bestseller'],
    category: 'fudge',
    limitedEdition: false,
    options: [
      sizeOption({
        'Half Pound': 12.99,
        'One Pound':  22.99,
        'Two Pounds': 39.99,
      }),
    ],
  },

  {
    id: '3',
    slug: 'salted-caramel-dream-fudge',
    name: 'Salted Caramel Dream Fudge',
    price: 14.99,
    images: ['/fudge5.jpg'],
    description: 'Buttery caramel fudge topped with a sprinkle of sea salt. The perfect balance of sweet and savory in every creamy bite.',
    tags: ['bestseller'],
    category: 'fudge',
    limitedEdition: false,
    options: [
      sizeOption({
        'Half Pound': 14.99,
        'One Pound':  25.99,
        'Two Pounds': 44.99,
      }),
    ],
  },

  {
    id: '4',
    slug: 'maple-walnut-fudge',
    name: 'Maple Walnut Fudge',
    price: 13.99,
    images: ['/fudge7.jpg'],
    description: 'Pure maple syrup and crunchy walnuts create this rustic, homestyle fudge. A taste of tradition in every bite.',
    tags: [],
    category: 'fudge',
    limitedEdition: false,
    options: [
      sizeOption({
        'Half Pound': 13.99,
        'One Pound':  23.99,
      }),
    ],
  },

  {
    id: '5',
    slug: 'strawberry-chocolate-fudge',
    name: 'Strawberry Chocolate Fudge',
    price: 14.99,
    images: ['/strawberry-coco.jpg'],
    description: 'Luscious strawberry swirled into rich chocolate fudge. A fruity, creamy combination that keeps people coming back for more.',
    tags: ['seasonal'],
    category: 'fudge',
    limitedEdition: false,
    options: [
      sizeOption({
        'Half Pound': 14.99,
        'One Pound':  25.99,
      }),
    ],
  },

  // ── CANDY ──────────────────────────────────────────────────────────────────

  {
    id: '6',
    slug: 'chocolate-covered-oreos',
    name: 'Chocolate Covered Oreos',
    price: 9.99,
    images: ['/coco-covered-oreos.jpg'],
    description: 'Classic Oreos hand-dipped in our premium chocolate coating. A crowd-pleasing treat great for gifting, events, or snacking.',
    tags: ['bestseller', 'gift-ready'],
    category: 'candy',
    limitedEdition: false,
    options: [
      {
        name: 'Chocolate Type',
        type: 'single',
        required: true,
        values: ['Milk Chocolate', 'Dark Chocolate', 'White Chocolate'],
        // no prices here = same price for all chocolate types
      },
      {
        name: 'Quantity',
        type: 'dropdown',
        required: true,
        values: ['6 pack', '12 pack'],
        prices: {
          '6 pack':  9.99,
          '12 pack': 17.99,
        },
      },
    ],
  },

  {
    id: '7',
    slug: 'freeze-dried-candy',
    name: 'Freeze Dried Candy',
    price: 7.99,                           // same price for all varieties
    images: ['/freeze-dried-red-hots.jpg'],
    description: 'Made right in our store so you always get the freshest selection! We freeze dry a rotating variety of your favorite candies for an incredible crunchy, intense flavor experience.',
    tags: ['new'],
    category: 'candy',
    limitedEdition: false,
    options: [
      {
        name: 'Variety',
        type: 'single',
        required: true,
        values: FREEZE_DRIED_VARIETIES,
        // add prices here if varieties have different prices, e.g.:
        // prices: { 'Red Hots': 7.99, 'Skittles': 8.99 }
      },
    ],
  },

  {
    id: '8',
    slug: 'nostalgic-candy-collection',
    name: 'Nostalgic Candy Collection',
    price: 18.99,
    images: ['/pez.jpg'],
    description: 'A delightful assortment of classic candies that bring back sweet memories — Necco Wafers, Boston Baked Beans, French Burnt Peanuts, Rock Candy, Nik L Nip wax bottles, and more!',
    tags: ['candy'],
    category: 'candy',
    limitedEdition: false,
    options: [],                           // no options = just add to cart
  },

  // ── GIFTS ──────────────────────────────────────────────────────────────────

  {
    id: '9',
    slug: 'artisan-gift-box',
    name: 'Artisan Gift Box',
    price: 39.99,
    images: ['/boozy-cakes-and-others.jpg'],
    description: 'A beautifully curated box featuring our handmade fudge, specialty candies, and local artisan treats. Perfect for any occasion — we also carry gifts from local artisan vendors.',
    tags: ['gift-ready', 'bestseller'],
    category: 'gifts',
    limitedEdition: false,
    options: [
      {
        name: 'Gift Box Size',
        type: 'single',
        required: true,
        values: ['Small (8 pieces)', 'Medium (12 pieces)', 'Large (16 pieces)'],
        prices: {
          'Small (8 pieces)':   29.99,
          'Medium (12 pieces)': 39.99,
          'Large (16 pieces)':  54.99,
        },
      },
      {
        name: 'Include Gift Message',
        type: 'dropdown',
        required: false,
        values: ['No', 'Yes'],
        // no extra charge for a gift message
      },
    ],
  },

  {
    id: '10',
    slug: 'wedding-favor-fudge-boxes',
    name: 'Wedding Favor Fudge Boxes',
    price: 99.99,                          // default = 25-box price
    images: ['/fudge6.jpg'],
    description: 'Individually wrapped fudge pieces in elegant boxes. Perfect as wedding favors or party gifts. Contact us to arrange custom orders — minimum order of 25.',
    tags: ['gift-ready', 'events'],
    category: 'gifts',
    limitedEdition: false,
    options: [
      {
        name: 'Fudge Flavor',
        type: 'single',
        required: true,
        values: ['Chocolate', 'Peanut Butter', 'Maple Walnut', 'Salted Caramel'],
      },
      {
        name: 'Quantity',
        type: 'dropdown',
        required: true,
        values: ['25 boxes', '50 boxes', '100 boxes'],
        prices: {
          '25 boxes':  99.99,
          '50 boxes':  174.99,
          '100 boxes': 299.99,
        },
      },
    ],
  },

];

