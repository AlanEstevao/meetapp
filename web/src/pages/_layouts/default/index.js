import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper } from './styles';

function DefaultLayout({ children }) {
  return(
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

export default DefaultLayout;

DefaultLayout.protoTypes = {
  children: PropTypes.element.isRequired,
};