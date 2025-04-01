import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

import React from 'react'

const InitiatePaymentsButton = () => {
   return (
     <Button
       size="lg"
       className="w-full h-12 shadow-lg uppercase text-base font-semibold transition-opacity  bg-purple-700 hover:bg-purple-700/80"
     >
       <Icon size="30" icon="shield" />
       Proceed to Pay
     </Button>
   );
}

export default InitiatePaymentsButton