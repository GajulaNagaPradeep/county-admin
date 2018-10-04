import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link as LinkRWD, PageHeader } from 'react-wood-duck';
import AddVerifiedUser from './AddVerifiedUser';
import VerifyUser from './VerifyUser';
import ErrorMessage from '../../common/ErrorMessage';

/* eslint camelcase: 0 */
export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false,
      racfid: '',
      email: '',
      disableActionBtn: true,
      addUser: true,
      verifyNewUserDetails: props.verifyNewUserDetails,
      valid: {
        emailValueValid: true,
      },
      errorMessage: {
        emailError: '',
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let verifyNewUserDetails = nextProps.verifyNewUserDetails;
    this.setState({ verifyNewUserDetails });
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
    this.validateField(event.target.value);
    if (
      event.target.value !== '' &&
      this.state.racfid !== '' &&
      this.state.errorMessage.emailError === ''
    ) {
      this.setState({ disableActionBtn: false });
    } else {
      this.setState({ disableActionBtn: true });
    }
  };

  validateField = value => {
    let errorMessage = this.state.errorMessage;
    const emailValueValid = /^[a-zA-Z0-9_!#$%&’*+/=?`'{^.-]*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i.test(
      value
    );
    emailValueValid
      ? (errorMessage.emailError = '')
      : (errorMessage.emailError = 'Please enter a valid email.');
  };

  handleRacfid = event => {
    this.setState({ racfid: event.target.value });
    if (event.target.value !== '' && this.state.email !== '') {
      this.setState({ disableActionBtn: false });
    } else {
      this.setState({ disableActionBtn: true });
    }
  };

  onVerify = () => {
    const { email, racfid } = this.state;
    this.props.actions.fetchPermissionsActions();
    this.props.actions.validateNewUserActions(email, racfid);
    this.setState({ verify: true });
  };

  verifyUser = () => {
    if (this.state.addUser) {
      return (
        <VerifyUser
          onVerify={this.onVerify}
          handleEmailChange={this.handleEmail}
          handleRacfChange={this.handleRacfid}
          disableActionBtn={this.state.disableActionBtn}
          valid={this.state.valid}
          errorMessage={this.state.errorMessage}
        />
      );
    }
  };

  onAddUser = () => {
    this.props.actions.addUserActions(this.state.verifyNewUserDetails.user);
    this.setState({ addUser: false, verify: false });
  };

  addUser = () => {
    if (this.state.verify) {
      return (
        <AddVerifiedUser
          verifyNewUserDetails={this.state.verifyNewUserDetails}
          onAddUser={this.onAddUser}
          email={this.state.email}
          racfid={this.state.racfid}
          officesList={this.props.officesList}
        />
      );
    }
  };

  render() {
    const {
      dashboardUrl,
      dashboardClickHandler,
      validateNewUserError,
    } = this.props;
    return this.state.addUser ? (
      <div>
        <PageHeader pageTitle="Add User" button="" />
        <div className="container">
          <div className="col-md-12">
            Back to:{' '}
            <LinkRWD
              text="Dashboard"
              href={dashboardUrl}
              clickHandler={dashboardClickHandler}
            />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
          </div>
          <ErrorMessage error={validateNewUserError} />
          {this.verifyUser()}
          {this.addUser()}
        </div>
      </div>
    ) : (
      <div>
        <Redirect from="/verify" to={`/add_user`} />
      </div>
    );
  }
}

AddUser.propTypes = {
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object,
  verifyNewUserDetails: PropTypes.object,
  addUser: PropTypes.bool,
  permissionRoles: PropTypes.any,
  details: PropTypes.any,
  id: PropTypes.string,
  validateNewUserError: PropTypes.object,
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
};

AddUser.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
