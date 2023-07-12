import { audioSchema, collectionSchema, profileSchema } from './schemas';
import { ValidationStatus, validateProps, EntityName, ValidationResult } from './types';

const schemas = {
  audio: audioSchema,
  collection: collectionSchema,
  profile: profileSchema
};

export const validate = async (entityName: EntityName, props: validateProps): Promise<ValidationResult> => {
  try {
    await schemas[entityName].validate(props);
    return { status: ValidationStatus.valid };
  } catch (error) {
    return {
      status: ValidationStatus.invalid,
      message: error?.message || 'Form is not valid',
    };
  }
};
