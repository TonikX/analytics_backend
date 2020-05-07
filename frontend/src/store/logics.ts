import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import WorkProgramLogic from '../containers/WorkProgram/logics';

export default [
    ...SignInLogic,
    ...SignUpLogic,
    ...WorkProgramLogic,
];