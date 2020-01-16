// ==========================================================================
// About
// ==========================================================================

import asyncComponent from '../../../components/async';

export default asyncComponent(() =>
    import('./logout').then(module => module.default)
);
