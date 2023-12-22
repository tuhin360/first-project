import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemesterCode } from "./academicSemester.interface"


const createAcademicSemesterIntoDB =async (payload:TAcademicSemesterCode) => {
    const result = await AcademicSemester.create(payload);
    return result;
}



export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}