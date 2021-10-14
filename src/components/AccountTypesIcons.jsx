// import React from 'react';
// import [company, enterprise, distributor, user, end_user] svgs from ../assets/images/userIcons 
import {ReactComponent as company} from '../assets/images/userIcons/company.svg';
import {ReactComponent as enterprise} from '../assets/images/userIcons/enterprise.svg';
import {ReactComponent as distributor} from '../assets/images/userIcons/distributor.svg';
import {ReactComponent as user} from '../assets/images/userIcons/user.svg';
// import {ReactComponent as end_user} from '../assets/images/userIcons/user.svg';

function AccountTypesIcons(type) {
  console.log(type.split(' ').join('_').toLowerCase());
   let data = {
          company,
            enterprise,
            distributor,
            user,
            end_user: user
      };
  return data[type.split(' ').join('_').toLowerCase()] 
}

export default AccountTypesIcons;
