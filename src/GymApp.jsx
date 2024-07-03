import React from 'react';

import {
  ensureConfig,
} from '@edx/frontend-platform';

import {
  AppProvider
} from '@edx/frontend-platform/react';

ensureConfig(['MARKETING_SITE_BASE_URL'], 'GymApp');

import { GymFooter, GymHeader } from '@edx/gym-frontend';

ensureConfig(['MARKETING_SITE_BASE_URL'], 'GymApp');

import './GymApp.scss';
import Head from './head/Head';
import configureStore from './data/configureStore';

import AppRoutes from './routes/AppRoutes';

const GymApp = () => (
  <AppProvider store={configureStore()}>
    <Head />
    <GymHeader secondaryNav="dashboard" />
    <main id="main">
      <div className="container">
        <AppRoutes />
      </div>
    </main>
    <GymFooter />
  </AppProvider>
);

export default GymApp;
