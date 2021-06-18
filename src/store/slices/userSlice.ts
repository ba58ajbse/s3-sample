import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store'
import { Auth } from 'aws-amplify'
import { UserInfoType } from '../../interfaces/types'

const initialState: UserInfoType = { name: '', email: '', tel: '', token: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        tel: action.payload.tel,
        token: action.payload.token,
      }
    },
  },
})

export const { setUserInfo } = userSlice.actions

export const setUserInfoAsync = (): AppThunk => async (dispatch) => {
  const userInfo = await Auth.currentAuthenticatedUser()
  const name = userInfo.username
  const email = userInfo.attributes.email
  const tel = userInfo.attributes.phone_number
  const token = userInfo.signInUserSession.idToken.jwtToken

  dispatch(setUserInfo({ name, email, tel, token }))
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
