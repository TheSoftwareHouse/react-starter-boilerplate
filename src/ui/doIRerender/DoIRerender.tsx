import React from 'react';

import { DoIRerenderProps } from './DoIRerender';

export const DoIRerender: React.FC<DoIRerenderProps> = React.memo(props => (
  <div>
    I should not rerender. Check the console to be sure whether I didnt! props: {JSON.stringify(props).slice(0, 100)}
  </div>
));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(DoIRerender as any).whyDidYouRender = true;
