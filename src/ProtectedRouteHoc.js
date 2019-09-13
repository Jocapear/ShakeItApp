import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { bool, any, object } from 'prop-types'
import { useAuth } from './AuthContext'

const ProtectedRouteHoc = ({ component: Component, isLoggedIn, ...rest }) => {
	const Auth = useAuth()
	if (Auth.isLoadingAuth) {
		return <p>Loading...</p>
	}
	if (Auth.isLoggedIn || rest.public) {
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>
				}}
			/>
		)
	}
	return <Redirect to={{ pathname: '/login' }} />
}

ProtectedRouteHoc.propTypes = {
	component: any,
	rest: object,
	props: object,
}

export default withRouter(ProtectedRouteHoc)