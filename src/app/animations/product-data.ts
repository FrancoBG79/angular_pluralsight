import { IProduct } from "./catalog/product.model";


export class ProductRobotData {

//     {
//       id: 1,
//       productName: 'Leaf Rake',
//       productCode: 'GDN-0011',
//       description: 'Leaf rake with 48-inch wooden handle',
//       price: 19.95,
//       quantityInStock: 15,
//       hasReviews: true
//     },
//     {
//       id: 2,
//       productName: 'Garden Cart',
//       productCode: 'GDN-0023',
//       description: '15 gallon capacity rolling garden cart',
//       price: 32.99,
//       quantityInStock: 2,
//       hasReviews: true
//     },
//     {
//       id: 5,
//       productName: 'Hammer',
//       productCode: 'TBX-0048',
//       description: 'Curved claw steel hammer',
//       price: 8.9,
//       quantityInStock: 8,
//       hasReviews: true
//     },
//     {
//       id: 8,
//       productName: 'Saw',
//       productCode: 'TBX-0022',
//       description: '15-inch steel blade hand saw',
//       price: 11.55,
//       quantityInStock: 6,
//       hasReviews: false
//     },
//     {
//       id: 10,
//       productName: 'Video Game Controller',
//       productCode: 'GMG-0042',
//       description: 'Standard two-button video game controller',
//       price: 35.95,
//       quantityInStock: 12,
//       hasReviews: true
//     }
//   ];
  static products: IProduct[] = [
    {
      id: 1,
      description:
        "A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.",
      name: "Large Cyclops",
      imageName: "head-big-eye.png",
      category: "Heads",
      price: 1220.5,
      discount: 0.2,
    },
    {
      id: 17,
      description: "A spring base - great for reaching high places.",
      name: "Spring Base",
      imageName: "base-spring.png",
      category: "Bases",
      price: 1190.5,
      discount: 0,
    },
    {
      id: 6,
      description:
        "An articulated arm with a claw -- great for reaching around corners or working in tight spaces.",
      name: "Articulated Arm",
      imageName: "arm-articulated-claw.png",
      category: "Arms",
      price: 275,
      discount: 0,
    },
    {
      id: 2,
      description:
        "A friendly robot head with two eyes and a smile -- great for domestic use.",
      name: "Friendly Bot",
      imageName: "head-friendly.png",
      category: "Heads",
      price: 945.0,
      discount: 0.2,
    },
    {
      id: 3,
      description:
        "A large three-eyed head with a shredder for a mouth -- great for crushing light medals or shredding documents.",
      name: "Shredder",
      imageName: "head-shredder.png",
      category: "Heads",
      price: 1275.5,
      discount: 0,
    },
    {
      id: 16,
      description:
        "A single-wheeled base with an accelerometer capable of higher speeds and navigating rougher terrain than the two-wheeled variety.",
      name: "Single Wheeled Base",
      imageName: "base-single-wheel.png",
      category: "Bases",
      price: 1190.5,
      discount: 0.1,
    },
    {
      id: 13,
      description: "A simple torso with a pouch for carrying items.",
      name: "Pouch Torso",
      imageName: "torso-pouch.png",
      category: "Torsos",
      price: 785,
      discount: 0,
    },
    {
      id: 7,
      description:
        "An arm with two independent claws -- great when you need an extra hand. Need four hands? Equip your bot with two of these arms.",
      name: "Two Clawed Arm",
      imageName: "arm-dual-claw.png",
      category: "Arms",
      price: 285,
      discount: 0,
    },

    {
      id: 4,
      description: "A simple single-eyed head -- simple and inexpensive.",
      name: "Small Cyclops",
      imageName: "head-single-eye.png",
      category: "Heads",
      price: 750.0,
      discount: 0,
    },
    {
      id: 9,
      description:
        "An arm with a propeller -- good for propulsion or as a cooling fan.",
      name: "Propeller Arm",
      imageName: "arm-propeller.png",
      category: "Arms",
      price: 230,
      discount: 0.1,
    },
    {
      id: 15,
      description: "A rocket base capable of high speed, controlled flight.",
      name: "Rocket Base",
      imageName: "base-rocket.png",
      category: "Bases",
      price: 1520.5,
      discount: 0,
    },
    {
      id: 10,
      description: "A short and stubby arm with a claw -- simple, but cheap.",
      name: "Stubby Claw Arm",
      imageName: "arm-stubby-claw.png",
      category: "Arms",
      price: 125,
      discount: 0,
    },
    {
      id: 11,
      description:
        "A torso that can bend slightly at the waist and equiped with a heat guage.",
      name: "Flexible Gauged Torso",
      imageName: "torso-flexible-gauged.png",
      category: "Torsos",
      price: 1575,
      discount: 0,
    },
    {
      id: 14,
      description: "A two wheeled base with an accelerometer for stability.",
      name: "Double Wheeled Base",
      imageName: "base-double-wheel.png",
      category: "Bases",
      price: 895,
      discount: 0,
    },
    {
      id: 5,
      description:
        "A robot head with three oscillating eyes -- excellent for surveillance.",
      name: "Surveillance",
      imageName: "head-surveillance.png",
      category: "Heads",
      price: 1255.5,
      discount: 0,
    },
    {
      id: 8,
      description: "A telescoping arm with a grabber.",
      name: "Grabber Arm",
      imageName: "arm-grabber.png",
      category: "Arms",
      price: 205.5,
      discount: 0,
    },
    {
      id: 12,
      description: "A less flexible torso with a battery gauge.",
      name: "Gauged Torso",
      imageName: "torso-gauged.png",
      category: "Torsos",
      price: 1385,
      discount: 0,
    },
    {
      id: 18,
      description:
        "An inexpensive three-wheeled base. only capable of slow speeds and can only function on smooth surfaces.",
      name: "Triple Wheeled Base",
      imageName: "base-triple-wheel.png",
      category: "Bases",
      price: 700.5,
      discount: 0,
    },
  ];
}