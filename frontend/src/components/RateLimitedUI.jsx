import { ZapIcon } from 'lucide-react';
import { useState } from 'react';

const RateLimitedUI = () => {
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <div className='bg-primary/10 border border-primary/20 rounded-lg p-6 shadow-sm'>
                <div className='flex flex-col md:flex-row items-center md:items-start p-6'>
                    <div className='flex-shrink-0 bg-primary/20 p-4 rounded-full flex items-center justify-center md:mr-6 mb-4 md:mb-0'>
                        <ZapIcon className='size-10 text-primary' />
                    </div>
                    <div className='flex-1 text-center md:text-left'>
                        <h3 className='text-xl font-bold mb-2'>Rate Limit reached</h3>
                        <p className='texxt-base-content mb-1'>
                            You have reached the rate limit for this feature. Please wait a while before trying again.
                        </p>
                        <p className='text-sm text-primary'>
                            If you think this is an error, please contact support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateLimitedUI
