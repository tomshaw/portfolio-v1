// ==========================================================================
// About
// ==========================================================================

import asyncComponent from '../../../components/async';

export default asyncComponent(() =>
    import('./login').then(module => module.default)
);
