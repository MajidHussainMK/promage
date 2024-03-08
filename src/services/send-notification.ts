
export interface NotificationProps {
  recipientId: string;
  content: string;
  createdAt?: Date;
}

class Notification {
  private props: NotificationProps;

  constructor(
    props: NotificationProps,
  ) {
    this.props = {
      ...props,
      createdAt: new Date(),
    };
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get content(): string {
    return this.props.content;
  }
}

interface SendNotificationRequest {
  recipientId: string;
  content: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor() {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content } = request;

    const notification = new Notification({
      recipientId,
      content,
    });

    return {
      notification,
    };
  }
}