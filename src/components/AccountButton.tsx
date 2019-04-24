import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';

const userId : string = '2JZ179iMcxZ6uH7lkTpGJxCDvbF3'; // hard coded test user id

const AccountButton = () =>
    <Link to={routes.USER(userId)}>
    <Button
        type='button'
        color='secondary'
    >
    Account
    </Button>
    </Link>;

export default AccountButton;