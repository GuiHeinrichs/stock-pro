export type Notification = {
  id: number;
  productId: number;
  message: string;
  createdAt: Date;
};

const notifications = new Map<number, Notification[]>();
let nextId = 1;

export const NotificationService = {
  async send(clientId: number, productId: number, message: string) {
    const notification: Notification = {
      id: nextId++,
      productId,
      message,
      createdAt: new Date(),
    };
    const list = notifications.get(clientId) || [];
    list.push(notification);
    notifications.set(clientId, list);

    console.log(`Notification sent to client ${clientId}: ${message}`);
    return notification;
  },

  async list(clientId: number) {
    return notifications.get(clientId) || [];
  },

  async clear(clientId: number) {
    notifications.delete(clientId);
  },
};
