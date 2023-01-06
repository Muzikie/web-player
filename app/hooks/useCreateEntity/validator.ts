import { trackSchema, collectionSchema } from './schemas';
import { ValidationStatus, validateProps, EntityName } from './types';

const schemas = {
  track: trackSchema,
  album: collectionSchema,
};

export const validate = async (entityName: EntityName, props: validateProps): Promise<ValidationStatus> => {
  try {
    await schemas[entityName].validate(props);
    return ValidationStatus.valid;
  } catch (_error) {
    console.log(_error);
    return ValidationStatus.invalid;
  }
};
