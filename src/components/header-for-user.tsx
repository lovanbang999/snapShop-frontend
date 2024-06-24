import HeaderForUserLargeDevice from './header-for-user-large-device'
import HeaderForUserMobile from './header-for-user-mobile'

function HeaderForUser() {
  return (
    <div>
      <HeaderForUserMobile />
      <HeaderForUserLargeDevice />
    </div>
  )
}

export default HeaderForUser
