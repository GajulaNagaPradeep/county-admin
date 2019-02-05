import React from 'react'
import { shallow } from 'enzyme'
import Notes from './Notes'

describe('Notes', () => {
  let wrapper
  const onChangeSpy = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Notes isUserEditable={true} userNotes={'Hello'} onChange={onChangeSpy} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('Input').length).toBe(1)
  })

  it('when the user is editable renders the input field to edit notes', () => {
    wrapper.setProps({ isUserEditable: true })
    expect(wrapper.find('Input').length).toBe(1)
  })

  it('when the user is not editable renders just existing notes', () => {
    wrapper.setProps({ isUserEditable: false })
    expect(wrapper.find('Input').length).toBe(0)
    expect(wrapper.find('CardBody').props().children).toEqual({ userNotes: 'Hello' })
  })

  it('#onChange  handleInputChange function is called when onChange event triggered', () => {
    wrapper.find('Input').simulate('change', {
      target: { value: 'Use this text as content' },
    })
    expect(onChangeSpy).toHaveBeenCalledWith('notes', 'Use this text as content')
  })
})
