import Button from '@material-ui/core/Button';
import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import * as routes from '../constants/routes';
import {connect} from "react-redux";

interface AccountButtonProps {
    auth: any,
}

const AccountButton = (props: AccountButtonProps) =>
<Link to={routes.USER(props.auth.uid)}>
    <Button
        type='button'
        color='secondary'
    >
    Account
        {console.log(props.auth)}
    </Button>
    </Link>;

export default
connect(
    ({firebase: {auth}}: any) => ({
        auth,
    }),
)
(AccountButton);