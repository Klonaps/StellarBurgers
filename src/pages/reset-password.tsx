import React from 'react'
import ResetPasswordPage from '../components/reset-password-page/reset-password-page'

const ResetPassword: React.FC = () => {
  document.title = 'Stellar Burgers - Восстановление пароля'
  return (
    <ResetPasswordPage />
  )
}

export default ResetPassword