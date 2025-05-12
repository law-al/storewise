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
