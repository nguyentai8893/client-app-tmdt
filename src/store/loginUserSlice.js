import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
	user: null,
};

const loginSlicce = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLogin(state, actions) {
			state.isLogin = true;
			state.user = actions.payload;
			localStorage.setItem('user', JSON.stringify(actions.payload));
		},
		onLogout(state) {
			state.isLogin = false;
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('products');
			localStorage.removeItem('cartItems');
			localStorage.removeItem('productData');
			localStorage.removeItem('order');
			localStorage.removeItem('roomId');
		},
	},
});

export const loginAction = loginSlicce.actions;
export default loginSlicce.reducer;
