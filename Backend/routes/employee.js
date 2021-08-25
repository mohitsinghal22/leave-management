const router = require('express').Router();
let employee = require('../models/employee.model');

router.route('/').get((req,res)=>{
    employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json(`Error - ${err}`));
});

router.route('/add').post((req,res) =>{
    const employeeId = Number(req.body.employeeId);
    const PSID = Number(req.body.PSID);
    const employeeName = req.body.employeeName;
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    const appliedLeaves = Number(req.body.appliedLeaves);

    const newEmployee = new employee({
        employeeId,
        PSID,
        employeeName,
        startDate,
        endDate,
        appliedLeaves
    })

    newEmployee.save()
        .then(() => res.json('Employee Leaves Added'))
        .catch((err) => res.status(400).json(`Error - ${err}`));
});

router.route('/:id').get((req,res)=>{
    // employee.findById(req.params.id)
    //     .then(employeeDetails => res.json(employeeDetails))
    //     .catch(err => res.status(400).json(`Error get by id - ${err}`));
    employee.find({employeeId: req.params.id})
        .then(employeeDetails => res.json(employeeDetails))
        .catch(err => res.status(400).json(`Error get by id - ${err}`));
});

router.route('/update/:id').post((req,res) =>{
    employee.findById(req.params.id)
        .then(Employee => {
            Employee.employeeId = Number(req.body.employeeId);
            Employee.PSID = Number(req.body.PSID);
            Employee.employeeName = req.body.employeeName;
            Employee.startDate = Date.parse(req.body.startDate);
            Employee.endDate = Date.parse(req.body.endDate);
            Employee.appliedLeaves = Number(req.body.appliedLeaves);

            Employee.save()
                .then(() => res.json('Successfully Updated'))
                .catch((err) => res.status(400).json(`Error while update - ${err}`));
        })
        .catch((err => res.status(400).json(`Error - ${err}`)));
});

router.route('/delete/:id').delete((req,res) =>{
    employee.findByIdAndDelete(req.params.id)
        .then(()=> res.json(`Leaves deleted Successfully.`))
        .catch((err) =>  res.status(400).json(`Error - ${err}`));
});

module.exports = router;