import React from 'react';
import { shallow } from 'enzyme';
import AddVerifiedUser from './AddVerifiedUser';

describe('AddVerifiedUser', () => {
  const verifyNewUserDetails = {
    user: {
      id: 'id',
      first_name: 'Firstname0',
      last_name: 'Lastname0',
      middle_name: 'Middlename0',
      county_name: 'MyCounty',
    },
    verification_passed: true,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AddVerifiedUser verifyNewUserDetails={verifyNewUserDetails} />
    );
  });

  describe('when verification passed', () => {
    it('renders the Showfields with verifyNewUserDetails', () => {
      wrapper = shallow(
        <AddVerifiedUser verifyNewUserDetails={verifyNewUserDetails} />
      );
      expect(wrapper.find('div.label').text()).toBe(
        'Please Verify the details of the CWS/CMS user you want to add to CWS-CARES'
      );
      expect(wrapper.find('ShowField').length).toBe(5);
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toEqual('Full Name');
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toEqual('Office Name');
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toEqual('CWS Login');
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toEqual('Email');
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Office Phone Number');
    });

    it('renders the <ShowField/> props.children at label:fullName', () => {
      let expectedValue = [
        `${verifyNewUserDetails.user.last_name}`,
        `${', '}`,
        `${verifyNewUserDetails.user.first_name}`,
        `${' '}`,
        `${verifyNewUserDetails.user.middle_name}`,
      ];
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().children
      ).toEqual(expectedValue);
    });
  });

  describe('when verification not passed', () => {
    it('renders the label inside the grid wrapper', () => {
      const newUserDetails = {
        verification_passed: false,
        verification_message: 'No ID',
        error_code: 'CAP',
      };
      wrapper = shallow(
        <AddVerifiedUser verifyNewUserDetails={newUserDetails} />
      );
      expect(wrapper.find('Alert').length).toBe(1);
    });
  });

  describe('when verification is still in progress', () => {
    it('renders the card with message', () => {
      const newUserDetails = {
        verification_message: 'No ID',
      };
      wrapper = shallow(
        <AddVerifiedUser verifyNewUserDetails={newUserDetails} />
      );
      expect(wrapper.find('Cards').length).toBe(1);
      expect(
        wrapper
          .find('span')
          .at(0)
          .text()
      ).toBe('Loading.....');
    });
  });
});
