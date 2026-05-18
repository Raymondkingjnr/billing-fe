interface IPlan {
  _id: string;
  name: string;
  features: string[];
  price: number;
  currency: string;
  description: string;
  interval: string;
  isActive: boolean;
  stripePriceId: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified?: boolean;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

interface MeRes {
  success: boolean;
  data: {
    subscription: ISubscription;
    user: AuthUser;
  };
}

interface ISubscription {
  plan: IPlan;
  user: AuthUser;
  status: string;
  startDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date;
}
interface CheckoutRes {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}
interface IsubscripionRes {
  success: boolean;
  message: string;
  data: ISubscription;
}
