export type Notification = {
  id: number;
  productDescription: string;
  productId: number;
  message: string;
  createdAt: Date;
};

const notifications = new Map<number, Notification[]>();
let nextId = 1;

export const NotificationService = {
  async send(clientId: number, productId: number, productDescription: string, message: string) {
    const notification: Notification = {
      id: nextId++,
      productId,
      productDescription,
      message,
      createdAt: new Date(),
    };
    const list = notifications.get(clientId) || [];
    list.push(notification);
    notifications.set(clientId, list);

    return notification;
  },

  async list(clientId: number) {
    return notifications.get(clientId) || [];
  },

  async clear(clientId: number) {
    notifications.delete(clientId);
  },
};
