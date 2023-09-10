import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
	children?: React.ReactNode
}

function RequireNoAuth({children}: RequireAuthProps) {
	// const userID = useSelector(state => state.user.id)
	// if (userID) return <Navigate to='/account' replace={true} />
	return children
}

export default RequireNoAuth