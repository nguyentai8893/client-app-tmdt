import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SigninPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/loginUserSlice';
import useAxios from '../hook/useAxios';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const SigninPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [err, setErr] = useState('');
	const [postData, setPotData] = useState({
		email: '',
		password: '',
	});

	const { apiRequest } = useAxios();
	const handlerSignIn = async () => {
		try {
			const res = await apiRequest(`${apiUrl}/api/login`, 'post', postData);
			if (res.status === false) {
				setErr(res.message);
			}
			if (res.user.role === 'guest') {
				dispatch(loginAction.onLogin(res.user));
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e) => {
		e.preventDefault();
		setPotData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-form')}>
					<h3>Sign In</h3>
					<div className={cx('form')}>
						<input
							onChange={handleChange}
							name='email'
							placeholder='Email'
							type='email'
						/>

						<input
							onChange={handleChange}
							name='password'
							placeholder='Password'
						/>

						{/* {error.passValue && (
							<p style={{ color: 'red' }}>{error.passValue}</p>
						)} */}
						<br />
						{err && <span className={cx('err')}>{err}</span>}
						<button className={cx('btn')} onClick={handlerSignIn}>
							Sign IN
						</button>
						<p>
							Create an account? <Link to='/register'>Click</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SigninPage;
