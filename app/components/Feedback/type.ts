import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export interface FeedbackProps {
  data: {
    message: string | FieldError ;
    error: boolean;
  };
}
