import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
