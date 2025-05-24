import { LucideIcon, Users, ShoppingBasket, ListOrdered } from "lucide-react";

// SEARCH
export interface SearchOption {
  id: string;
  title: string;
  logo: LucideIcon;
}

// Data with proper typing and consistent structure
export const searchOptions: SearchOption[] = [
  {
    id: "search-customer",
    title: "customer",
    logo: Users,
  },
  {
    id: "search-product",
    title: "product",
    logo: ShoppingBasket,
  },
  {
    id: "search-order",
    title: "order",
    logo: ListOrdered,
  },
];

// ORDERS
// Enums and constant types
export const OrderStatus = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  customer: string;
  createdAt: Date;
  completedAt?: Date;
}

export const searchOrderSummary: Order[] = [
  {
    id: "ord-1",
    orderNumber: "#12",
    status: OrderStatus.COMPLETED,
    customer: "Fajaar",
    createdAt: new Date(2024, 9, 19), // One day before completion
    completedAt: new Date(2024, 9, 20, 10),
  },
  {
    id: "ord-2",
    orderNumber: "#13",
    status: OrderStatus.IN_PROGRESS,
    customer: "Kim",
    createdAt: new Date(2024, 1, 15, 10),
    // No completedAt since it's in progress
  },
  {
    id: "ord-3",
    orderNumber: "#14",
    status: OrderStatus.IN_PROGRESS,
    customer: "Kent",
    createdAt: new Date(2024, 2, 10, 15),
    // No completedAt since it's in progress
  },
];

// CUSTOMERS
export interface Customer {
  id: string;
  image: string;
  name: string;
  username: string;
  email?: string;
}

export const customers: Customer[] = [
  {
    id: "cust-1",
    image: "/avatars/anisa.jpg", // Using local placeholders instead of external URLs
    name: "Anisa",
    username: "anissa123",
    email: "anisa@example.com",
  },
  {
    id: "cust-2",
    image: "/avatars/budiawan.jpg",
    name: "Budiawan",
    username: "budi789",
    email: "budiawan@example.com",
  },
  {
    id: "cust-3",
    image: "/avatars/kimberly.jpg",
    name: "Kimberly",
    username: "kimberly123",
    email: "kimberly@example.com",
  },
];

// NOTIFICATION
export const notificationTypes = {
  STOCK: "stock",
  ORDER: "order",
  SALE: "sale",
  PAYMENT: "payment",
} as const;

export type NotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export interface AppNotification {
  id: string;
  isOpen: boolean;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface NotificationGroup {
  date: Date;
  messages: AppNotification[];
}

export const notifications: NotificationGroup[] = [
  {
    date: new Date(2024, 9, 20, 10), // October 20, 2024 at 10:00
    messages: [
      {
        id: "n1",
        isOpen: true,
        type: notificationTypes.STOCK,
        title: "Low stock alert",
        message:
          "Inventory alert: Your stock for Classic Burger is running low. Restock soon to prevent out-of-stock situations.",
        timestamp: new Date(2024, 9, 20, 10, 5), // 10:05 AM
        isRead: false,
      },
      {
        id: "n2",
        isOpen: true,
        type: notificationTypes.ORDER,
        title: "New order received",
        message:
          "New order! You've received a new order from customer A. Check the details to prepare for fulfillment.",
        timestamp: new Date(2024, 9, 20, 9, 45), // 9:45 AM
        isRead: false,
      },
      {
        id: "n3",
        isOpen: false,
        type: notificationTypes.SALE,
        title: "Daily sales summary",
        message:
          "Sales update: You've reached 80% of today's target. Keep up the great work to hit 100%!",
        timestamp: new Date(2024, 9, 20, 9, 30), // 9:30 AM
        isRead: true,
      },
      {
        id: "n4",
        isOpen: true,
        type: notificationTypes.PAYMENT,
        title: "Payment received",
        message:
          "Payment Success! A payment of $120 has been processed for order #254. Thank you for your purchase!",
        timestamp: new Date(2024, 9, 20, 8, 15), // 8:15 AM
        isRead: false,
      },
    ],
  },
];

// Chart
export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export type TimeRange = "yearly" | "monthly" | "weekly";

export const graphData: Record<
  TimeRange,
  { value: string; revenue: number }[]
> = {
  yearly: [
    { value: "January", revenue: 7300 },
    { value: "February", revenue: 1000 },
    { value: "March", revenue: 1600 },
    { value: "April", revenue: 7000 },
    { value: "May", revenue: 6000 },
    { value: "June", revenue: 9200 },
    { value: "July", revenue: 1040 },
    { value: "August", revenue: 3400 },
    { value: "September", revenue: 6670 },
    { value: "October", revenue: 11000 },
    { value: "November", revenue: 1200 },
    { value: "December", revenue: 2300 },
  ],
  monthly: [
    { value: "1", revenue: 300 },
    { value: "2", revenue: 250 },
    { value: "3", revenue: 150 },
    { value: "4", revenue: 200 },
    { value: "5", revenue: 250 },
    { value: "6", revenue: 100 },
    { value: "7", revenue: 150 },
    { value: "8", revenue: 250 },
    { value: "9", revenue: 250 },
    { value: "2", revenue: 150 },
    { value: "10", revenue: 250 },
    { value: "11", revenue: 350 },
    { value: "12", revenue: 210 },
    { value: "13", revenue: 150 },
    // ...up to May 31
  ],
  weekly: [
    { value: "Sunday", revenue: 0 },
    { value: "Monday", revenue: 20 },
    { value: "Tuesday", revenue: 15 },
    { value: "Wednesday", revenue: 20 },
    { value: "Thursday", revenue: 15 },
    { value: "Friday", revenue: 10 },
    { value: "Saturday", revenue: 20 },
  ],
};

// PRODUCTS

export type Products = {
  productId: string;
  available: boolean;
  item: {
    name: string;
    image: string;
    price: number;
  };
  status: "published" | "draft" | "sold out";
  sales: number;
  revenue: number;
};

export const products: Products[] = [
  {
    productId: "#001",
    available: true,
    item: {
      name: "Nike Air Max 270",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 150,
    },
    status: "published",
    sales: 80,
    revenue: 12000,
  },
  {
    productId: "#002",
    available: false,
    item: {
      name: "Adidas Ultraboost",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 180,
    },
    status: "sold out",
    sales: 50,
    revenue: 9000,
  },
  {
    productId: "#003",
    available: true,
    item: {
      name: "Puma RS-X",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 120,
    },
    status: "published",
    sales: 100,
    revenue: 12000,
  },
  {
    productId: "#004",
    available: true,
    item: {
      name: "New Balance 990v5",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 175,
    },
    status: "draft",
    sales: 20,
    revenue: 3500,
  },
  {
    productId: "#005",
    available: false,
    item: {
      name: "Reebok Classic Leather",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 90,
    },
    status: "published",
    sales: 60,
    revenue: 5400,
  },
  {
    productId: "#006",
    available: true,
    item: {
      name: "Asics Gel-Kayano",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 160,
    },
    status: "published",
    sales: 45,
    revenue: 7200,
  },
  {
    productId: "#007",
    available: true,
    item: {
      name: "Under Armour HOVR",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 130,
    },
    status: "published",
    sales: 70,
    revenue: 9100,
  },
  {
    productId: "#008",
    available: false,
    item: {
      name: "Vans Old Skool",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 70,
    },
    status: "sold out",
    sales: 200,
    revenue: 14000,
  },
  {
    productId: "#009",
    available: true,
    item: {
      name: "Converse Chuck Taylor",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 60,
    },
    status: "published",
    sales: 150,
    revenue: 9000,
  },
  {
    productId: "#010",
    available: true,
    item: {
      name: "Salomon XT-6",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 200,
    },
    status: "published",
    sales: 30,
    revenue: 6000,
  },
];

// Orders
export type OrderPhase =
  | "pending" // Order placed, waiting for payment/processing
  | "processing" // Payment confirmed, preparing order
  | "shipped" // Order dispatched for delivery
  | "delivered" // Order successfully delivered
  | "cancelled" // Order cancelled by customer/system
  | "returned"; // Order returned by customer

export type DeliveryStatus =
  | "pending" // Not started yet
  | "processing" // Preparing/packaging
  | "shipped" // In transit
  | "delivered" // Successfully delivered
  | "failed" // Delivery attempt failed
  | "cancelled"; // Delivery cancelled

export type PaymentStatus =
  | "pending" // Payment not yet processed
  | "paid" // Payment successful
  | "failed" // Payment failed
  | "refunded"; // Payment refunded

export type PaymentType =
  | "credit card"
  | "debit card"
  | "paypal"
  | "apple pay"
  | "google pay"
  | "bank transfer"
  | "cash on delivery";

export type Orders = {
  id: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
  status: OrderPhase;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;

  orderDate?: string; // 🆕 When order was placed
  // 🆕 New payment and pricing fields
  paymentType: PaymentType;
  subtotal: number; // Price before tax and after discount
  taxPercent: number; // Tax percentage (e.g., 8.5 for 8.5%)
  taxAmount: number; // Calculated tax amount
  discount: number; // Discount amount

  totalItems: number;
  totalPrice: number; // Final amount (subtotal + tax - discount)
};

export const orders: Orders[] = [
  {
    id: "#001",
    product: {
      name: "Nike Air Max 270",
      image: "https://placehold.co/400/000000/FFF.png",
      price: 150,
    },
    status: "processing",
    deliveryStatus: "processing",
    paymentStatus: "paid",
    paymentType: "credit card",
    subtotal: 150,
    taxPercent: 8.5,
    taxAmount: 12.75,
    discount: 0,
    totalItems: 1,
    totalPrice: 162.75, // 150 + 12.75 - 0
  },
  {
    id: "#002",
    product: {
      name: "Adidas Ultraboost 21",
      image: "https://placehold.co/400/FF0000/FFF.png",
      price: 180,
    },
    status: "processing",
    deliveryStatus: "processing",
    paymentStatus: "paid",
    paymentType: "paypal",
    subtotal: 360,
    taxPercent: 8.5,
    taxAmount: 30.6,
    discount: 20, // $20 discount
    totalItems: 2,
    totalPrice: 370.6, // 360 + 30.60 - 20
  },
  {
    id: "#003",
    product: {
      name: "Puma RS-X3",
      image: "https://placehold.co/400/00FF00/FFF.png",
      price: 120,
    },
    status: "cancelled",
    deliveryStatus: "cancelled",
    paymentStatus: "refunded",
    paymentType: "debit card",
    subtotal: 120,
    taxPercent: 8.5,
    taxAmount: 10.2,
    discount: 0,
    totalItems: 1,
    totalPrice: 130.2, // 120 + 10.20 - 0
  },
  {
    id: "#004",
    product: {
      name: "New Balance Fresh Foam",
      image: "https://placehold.co/400/0000FF/FFF.png",
      price: 140,
    },
    status: "pending",
    deliveryStatus: "pending",
    paymentStatus: "pending",
    paymentType: "cash on delivery",
    subtotal: 420,
    taxPercent: 8.5,
    taxAmount: 35.7,
    discount: 50, // $50 bulk discount
    totalItems: 3,
    totalPrice: 405.7, // 420 + 35.70 - 50
  },
  {
    id: "#005",
    product: {
      name: "Reebok Classic Leather",
      image: "https://placehold.co/400/FFFF00/FFF.png",
      price: 90,
    },
    status: "delivered",
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    paymentType: "apple pay",
    subtotal: 90,
    taxPercent: 8.5,
    taxAmount: 7.65,
    discount: 10, // $10 first-time buyer discount
    totalItems: 1,
    totalPrice: 87.65, // 90 + 7.65 - 10
  },
  {
    id: "#006",
    product: {
      name: "Asics Gel-Kayano 27",
      image: "https://placehold.co/400/FF00FF/FFF.png",
      price: 160,
    },
    status: "shipped",
    deliveryStatus: "shipped",
    paymentStatus: "paid",
    paymentType: "google pay",
    subtotal: 320,
    taxPercent: 8.5,
    taxAmount: 27.2,
    discount: 25, // $25 loyalty discount
    totalItems: 2,
    totalPrice: 322.2, // 320 + 27.20 - 25
  },
  {
    id: "#007",
    product: {
      name: "Under Armour HOVR",
      image: "https://placehold.co/400/00FFFF/FFF.png",
      price: 130,
    },
    status: "cancelled",
    deliveryStatus: "cancelled",
    paymentStatus: "refunded",
    paymentType: "bank transfer",
    subtotal: 130,
    taxPercent: 8.5,
    taxAmount: 11.05,
    discount: 0,
    totalItems: 1,
    totalPrice: 141.05, // 130 + 11.05 - 0
  },
  {
    id: "#008",
    product: {
      name: "Vans Old Skool",
      image: "https://placehold.co/400/FFA500/FFF.png",
      price: 70,
    },
    status: "delivered",
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    paymentType: "credit card",
    subtotal: 140,
    taxPercent: 8.5,
    taxAmount: 11.9,
    discount: 15, // $15 promo code discount
    totalItems: 2,
    totalPrice: 136.9, // 140 + 11.90 - 15
  },
  {
    id: "#009",
    product: {
      name: "Converse Chuck Taylor",
      image: "https://placehold.co/400/800080/FFF.png",
      price: 60,
    },
    status: "delivered",
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    paymentType: "paypal",
    subtotal: 60,
    taxPercent: 8.5,
    taxAmount: 5.1,
    discount: 5, // $5 student discount
    totalItems: 1,
    totalPrice: 60.1, // 60 + 5.10 - 5
  },
  {
    id: "#010",
    product: {
      name: "Saucony Shadow 6000",
      image: "https://placehold.co/400/008000/FFF.png",
      price: 110,
    },
    status: "pending",
    deliveryStatus: "pending",
    paymentStatus: "pending",
    paymentType: "credit card",
    subtotal: 220,
    taxPercent: 8.5,
    taxAmount: 18.7,
    discount: 0,
    totalItems: 2,
    totalPrice: 238.7, // 220 + 18.70 - 0
  },
];
