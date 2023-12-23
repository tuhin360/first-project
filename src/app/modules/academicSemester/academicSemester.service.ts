import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
 
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
