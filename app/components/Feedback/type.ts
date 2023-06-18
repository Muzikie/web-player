import { FieldError } from 'react-hook-form';

export interface FeedbackProps {
  data: {
    message: string | FieldError ;
    error: boolean;
  };
}
