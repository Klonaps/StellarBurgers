import React from 'react'
import ForgotPasswordPage from '../components/fogot-password-page/forgot-password-page'

const ForgotPassword: React.FC = () => {
  document.title = 'Stellar Burgers - Восстановление пароля'
  return (
    <ForgotPasswordPage />
  )
}

export default ForgotPassword