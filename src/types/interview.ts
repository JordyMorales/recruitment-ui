export interface Interview {
  interviewId?: string;
  topic: string;
  description?: string;
  applicationId: any;
  scheduledAt: Date;
  duration: number;
  triggeredAt?: Date;
  stepId: any;
}
