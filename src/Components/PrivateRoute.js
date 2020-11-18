import React  from 'react'
import { Route, Redirect } from 'react-router-dom'

/* export default  ({ component, isLoggedIn, ...rest }) => {
    const Component = component
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn
                ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
                )


            }
        />
    )
} */
export default ({render, isLoggedIn,isAuthorized, ...rest}) => {
    return (
        <Route
            {...rest}
            render={ (props) => (isLoggedIn  && isAuthorized)
            ? (
                render(props)
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: {from: props.location}
                }} />
            )
            }
        />
    )
}