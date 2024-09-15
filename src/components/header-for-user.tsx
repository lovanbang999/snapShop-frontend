import HeaderForUserLargeDevice from './header-for-user-large-device'
import HeaderForUserMobile from './header-for-user-mobile'

function HeaderForUser() {
  return (
    <>
      <HeaderForUserMobile />
      <HeaderForUserLargeDevice />
    </>
  )
}

export default HeaderForUser
