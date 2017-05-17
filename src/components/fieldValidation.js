import React from 'react'

export const required = value => value ? undefined : 'Required'
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength6 = minLength(6)
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue1 = minValue(1)
export const maxValue = max => value =>
  value && value > max ? `Must be less than ${max}` : undefined
export const maxValue31 = maxValue(31)
export const maxValue12 = maxValue(12)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

export const renderBorderlessField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {
      touched &&  error ?
        <div className={error ? 'form-group form-error' : 'form-group'}>
          <label>{label+' '+error}</label>
          <input {...input} type={type} className="form-control"/>
        </div>
        :
        <div className={'form-group'}>
          <label>{label}</label>
          <input {...input} type={type} className="form-control"/>
        </div>
    }
  </div>
)

export const renderDateField = ({ input, label, type, meta: { touched, error, warning } }) => (
  touched &&  error ?
    <input {...input} type={type} className="custom-control text-uppercase date-error" placeholder={label}/>
    :
    <input {...input} type={type} className="custom-control text-uppercase" placeholder={label}/>
)