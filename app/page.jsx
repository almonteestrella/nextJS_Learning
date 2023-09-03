import Feed from '@components/Feed';
import React from 'react';

const home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='capitalize head_text text-center'>
                discover & share
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>
                    {' '}
                    AI-powerd prompts
                </span>
            </h1>
            <p className='text-center desc'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
                fugiat sequi cupiditate, veniam quo pariatur explicabo, est
                cumque quae accusantium enim laboriosam ipsam tempora minus
                debitis? Harum rem tempore quibusdam?
            </p>

            <Feed />
        </section>
    );
};

export default home;
