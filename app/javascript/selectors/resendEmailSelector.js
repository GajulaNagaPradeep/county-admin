import safeGet from 'lodash.get'

export const selectResendEmailDateTime = state => {
  const resendEmail = safeGet(
    state,
    'resendRegistrationEmail.registrationResentDateTime.last_registration_resubmit_date_time',
    ''
  )
  return resendEmail
}

export const selectResendEmailUserId = state => {
  const userId = state.resendRegistrationEmail ? state.resendRegistrationEmail.resendEmailUserId : null
  return userId
}

export const disableResendEmailButton = state => {
  const userDetailsId = safeGet(state, 'fetchDetails.details.records.user.id')
  const resendEmailUserId = selectResendEmailUserId(state)
  let index = -1
  if (resendEmailUserId && resendEmailUserId.length > 0 && userDetailsId) {
    index = resendEmailUserId.findIndex(id => id === userDetailsId)
  }
  if (index > -1) return true
  return false
}
