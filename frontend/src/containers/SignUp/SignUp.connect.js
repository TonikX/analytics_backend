import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from "./actions";
import * as Enum from './enum';
import { getFieldValue, isPasswordError } from './getters';
import { getAuth } from '../../layout/getters';

const mapStateToProps = (state) => {
  return {
    disableButton:
      getFieldValue(state, Enum.USERNAME_FIELD).length === 0 ||
      getFieldValue(state, Enum.FIRST_NAME_FIELD).length === 0 ||
      getFieldValue(state, Enum.LAST_NAME_FIELD).length === 0 ||
      getFieldValue(state, Enum.PASSWORD_FIELD).length === 0 ||
      getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD).length === 0 ||
      isPasswordError(state),
    isPasswordError: isPasswordError(state),
    auth: getAuth(state),
    username: getFieldValue(state, Enum.USERNAME_FIELD),
    firstName: getFieldValue(state, Enum.FIRST_NAME_FIELD),
    lastName: getFieldValue(state, Enum.LAST_NAME_FIELD),
    password: getFieldValue(state, Enum.PASSWORD_FIELD),
    passwordRepeat: getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD),
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
