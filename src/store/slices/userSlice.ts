import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store'
import { Auth } from 'aws-amplify'
import { UserInfoType } from '../../interfaces/types'

const initialState: UserInfoType = { name: '', email: '', tel: '' }

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

  dispatch(setUserInfo({ name, email, tel }))
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
