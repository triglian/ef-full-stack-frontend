interface IUser {
  name: string;
  accessToken: string;
}

interface IImageItem {
  download_url: string;
  width: number;
  height: number;
  author: string;
  thumbnail_url?: string;
  thumbnail_2x_url?: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
