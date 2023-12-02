import { Joi } from 'joi';
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(20)
      .regex(/^[A-Z][a-z]*$/, { name: 'capitalized format' })
      .messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'string.max': 'First name cannot be more than {#limit} characters',
        'string.pattern.base': 'First name must be in capitalized format',
      }),
    middleName: Joi.string().trim(),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Za-z]+$/, { name: 'alpha characters' })
      .messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name is required',
        'string.pattern.base':
          'Last name must contain only alphabetical characters',
      }),
  });

  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
  });

  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });

  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .trim()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'string.base': 'Gender must be a string',
        'string.empty': 'Gender is required',
        'any.only': 'Invalid gender value',
      }),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .required(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'block').default('active'),
  });

  export default studentValidationSchema;