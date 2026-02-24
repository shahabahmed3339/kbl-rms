const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const https = require('https');
const path = require('path');
const fs = require('fs');

const users = require("./routes/api/users");

const AssetsRouter = require('./routes/Assets');
const AssetCategoryRouter = require('./routes/AssetCategory');
const AssetSubCategoryRouter = require('./routes/AssetSubCategory');
const AssetTypeRouter = require('./routes/AssetType');
const DepartmentRouter = require('./routes/Department');
const DesignationRouter = require('./routes/Designation');
const HRRouter = require('./routes/HR');
const AssetIssueRouter = require('./routes/AssetIssue');
const ProcessRouter = require('./routes/Process');
const CIARouter = require('./routes/CIA');
const CIAMarkRouter = require('./routes/CIAMark');
const ProbabilityRouter = require('./routes/Probability');
const SeverityRouter = require('./routes/Severity');
const RiskRouter = require('./routes/Risk');
const VulnerabilityRouter = require('./routes/Vulnerability');
const ExposureRouter = require('./routes/Exposure');
const RiskAssessmentRouter = require('./routes/RiskAssessment');
const QMSRouter = require('./routes/QualityManagementSystem');
const ISMSRouter = require('./routes/InformationSecurityManagementSystem');
const SMSRouter = require('./routes/ServiceManagementSystem');
const RiskMitigationRouter = require('./routes/RiskMitigation');
const RegisterRouter = require('./routes/Register');
const YearRouter = require('./routes/Year');
const QuartersRouter = require('./routes/Quarters');
const VisionRouter = require('./routes/Vision');
const GoalRouter = require('./routes/Goal');
const ObjectiveRouter = require('./routes/Objective');
const PrDocRouter = require('./routes/ProcessDocumentation');
const LevelRouter = require('./routes/Levels');
const HierarchyRouter = require('./routes/Hierarchy');
const RequisitionRouter = require('./routes/Requisition');
const ApprovalRouter = require('./routes/Approval');
const RolesRouter = require('./routes/Roles');
const LogsRouter = require('./routes/Logs');
const LogsReport = require('./routes/LogsReport');
const FacilityRouter = require('./routes/Facility');
const ApplicationRouter = require('./routes/Application');
const ShortListRouter = require('./routes/ShortList');
const TechScheduleRouter = require('./routes/TechSchedule');
const TechEvaluationRouter = require('./routes/TechEvaluation');
const HRScheduleRouter = require('./routes/HRSchedule');
const HREvaluationRouter = require('./routes/HREvaluation');
const CriticalityRouter = require('./routes/Criticality');
const CIAMarkDeptRouter = require('./routes/CIAMarkDepartment');
const RiskManagementProgramRouter = require('./routes/RiskManagementProgram');
const CaseReportRouter = require('./routes/CaseReport');
const ProblemTypesRouter = require('./routes/ProblemTypes');
const ImportanceRouter = require('./routes/Importance');
const DeductionRouter = require('./routes/Deduction');
const PayrollRouter = require('./routes/Payroll');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));
app.use('/applications', express.static('applications'));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.get("/", function (req, res) {
  res.send('Welcome to Server')
});
app.use("/api/users", users);
app.use('/Assets', AssetsRouter);
app.use('/AssetCategory', AssetCategoryRouter);
app.use('/AssetSubCategory', AssetSubCategoryRouter);
app.use('/AssetType', AssetTypeRouter);
app.use('/Department', DepartmentRouter);
app.use('/Designation', DesignationRouter);
app.use('/HR', HRRouter);
app.use('/AssetIssue', AssetIssueRouter);
app.use('/Process', ProcessRouter);
app.use('/CIA', CIARouter);
app.use('/CIAMark', CIAMarkRouter);
app.use('/Probability', ProbabilityRouter);
app.use('/Severity', SeverityRouter);
app.use('/Risk', RiskRouter);
app.use('/Vulnerability', VulnerabilityRouter);
app.use('/Exposure', ExposureRouter);
app.use('/RiskAssessment', RiskAssessmentRouter);
app.use('/QualityManagementSystem', QMSRouter);
app.use('/InformationSecurityManagementSystem', ISMSRouter);
app.use('/ServiceManagementSystem', SMSRouter);
app.use('/RiskMitigation', RiskMitigationRouter);
app.use('/Register', RegisterRouter);
app.use('/Year', YearRouter);
app.use('/Quarters', QuartersRouter);
app.use('/Vision', VisionRouter);
app.use('/Goal', GoalRouter);
app.use('/Objective', ObjectiveRouter);
app.use('/ProcessDocumentation', PrDocRouter);
app.use('/Levels', LevelRouter);
app.use('/Hierarchy', HierarchyRouter);
app.use('/Requisition', RequisitionRouter);
app.use('/Approval', ApprovalRouter);
app.use('/Roles', RolesRouter);
app.use('/Logs', LogsRouter);
app.use('/Facility', FacilityRouter);
app.use('/Application', ApplicationRouter);
app.use('/ShortList', ShortListRouter);
app.use('/TechSchedule', TechScheduleRouter);
app.use('/TechEvaluation', TechEvaluationRouter);
app.use('/HRSchedule', HRScheduleRouter);
app.use('/HREvaluation', HREvaluationRouter);
app.use('/Criticality', CriticalityRouter);
app.use('/CIAMarkDepartment', CIAMarkDeptRouter);
app.use('/RiskManagementProgram', RiskManagementProgramRouter);
app.use('/CaseReport', CaseReportRouter);
app.use('/ProblemTypes', ProblemTypesRouter);
app.use('/Importance', ImportanceRouter);
app.use('/Deduction', DeductionRouter);
app.use('/Payroll', PayrollRouter);

const port = process.env.PORT || 5000;

// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)


app.listen(port, () => console.log(`Server up and running on port ${port} !`));
