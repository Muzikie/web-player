export type ProgressBarProps = {
  duration: number;
  progress: number;
  setProgress: (progress: number) => void;
};

export enum PlayerState {
  loginError = 'loginError',
  subscriptionError = 'subscriptionError',
  readyToPlay = 'readyToPlay',
}

export interface FeedbackProps {
  type: PlayerState;
}
