//required inbuilt packages
const express=require('express');
const router=express.Router();
//controllers import
const homeController=require('../../controllers/API/home_controller')
const doctorController=require('../../controllers/API/doctors_controller');
const patientsController=require('../../controllers/API/patients_controller');

//Different routes setup
router.get('/',homeController.home);
router.get('/doctors',doctorController.signIn);
router.get('/doctors/register',doctorController.signUp);
router.post('/doctors/createDoctor',doctorController.createDoctor);
router.post('/doctors/create-session',doctorController.createSession);
router.post('/patient/register',patientsController.register);
router.get('/patient/update-patient',patientsController.updatePatient);
router.get('/patient/all-patients-details',patientsController.allPatientsDetails);
router.get('/patient/all-report-base-on-status',patientsController.allPatientsReportBasedOnStatus);
router.post('/patient/create-report',patientsController.createReport);
router.post('/report/status',patientsController.reportBasedOnStatus)

module.exports=router;