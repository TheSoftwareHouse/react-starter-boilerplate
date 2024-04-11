import React from 'react';

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } = await import('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackHooks: true,
    trackAllPureComponents: true,
  });
}
