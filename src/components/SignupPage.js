import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignupPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';

import useAxios from '../hook/useAxios';
const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const SignupPage = () => {
	const navigate = useNavigate();
	const [err, setErr] = useState('');
	const [postData, setPostData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
	});
	const { loading, apiRequest } = useAxios();

	const handelChange = (e) => {
		e.preventDefault();
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};
	const handlerSignUP = async () => {
		try {
			const res = await apiRequest(`${apiUrl}/api/register`, 'post', postData);

			if (res && res.status === true) {
				navigate('/sign-in');
			}
			if (res && res.status === false) {
				setErr(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) return <div>Loading...</div>;

	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-form')}>
					<h3>Sign Up</h3>
					<div className={cx('form')}>
						<input
							onChange={handelChange}
							type='text'
							name='name'
							placeholder='Full Name'
						/>

						<br />
						<input
							onChange={handelChange}
							name='email'
							placeholder='Email'
							type='email'
						/>

						<br />
						<input
							onChange={handelChange}
							type='text'
							name='password'
							placeholder='Password'
						/>

						<br />
						<input
							onChange={handelChange}
							type='number'
							name='phone'
							placeholder='Phone'
						/>
						<br />
						{err && <span className={cx('err')}>{err}</span>}
						<button className={cx('btn')} onClick={handlerSignUP}>
							Sign Up
						</button>
						<p>
							Sign In? <Link to='/sign-in'>Click</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupPage;
