import { Audio } from '~/configs'

export type ProfileAddress = {
  data: {
    creatorAddress: string
  };
  audios: Audio[];
};
