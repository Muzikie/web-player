import { audioSchema, collectionSchema, profileSchema } from './schemas';
import { ValidationStatus, validateProps, EntityName } from './types';

const schemas = {
  audio: audioSchema,
  collection: collectionSchema,
  profile: profileSchema
};

export const validate = async (entityName: EntityName, props: validateProps): Promise<ValidationStatus> => {
  try {
    await schemas[entityName].validate(props);
    return ValidationStatus.valid;
  } catch (_error) {
    return ValidationStatus.invalid;
  }
};
