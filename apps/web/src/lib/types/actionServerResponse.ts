export type ServerActionResponse<T> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      message: string;
      errorCode?: 'SERVER_ERROR' | 'VALIDATION_ERROR';
    };
