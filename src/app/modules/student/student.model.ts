import { AcademicDepartment } from './../academicDepartment/academicDepartment.model';
import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: 'String',
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  middleName: {
    type: 'String',
    trim: true,
  },
  lastName: {
    type: 'String',
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact no is required'],
    trim: true,
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: 'String', required: [true, 'ID is required'], unique: true },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
      trim: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
