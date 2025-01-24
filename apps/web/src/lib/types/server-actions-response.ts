export type ServerActionResponse<T> =
  | {
      success: true;
      data?: T | null;
    }
  | {
      success: false;
      message: string;
      errorCode?: 'SERVER_ERROR' | 'VALIDATION_ERROR';
    };
