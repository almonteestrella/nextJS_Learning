'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setUpProviders();
    }, []);
    return (
        <nav className='w-full flex-between mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='promptopia logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>promptopia</p>
            </Link>

            {/* desktop navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt' className='black_btn'>
                            create post
                        </Link>
                        <button
                            className='outline_btn'
                            type='button'
                            onClick={signOut}
                        >
                            sign out
                        </button>
                        <Link href='/profile'>
                            <Image
                                src='/assets/images/logo.svg'
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                <button
                                    key={provider.name}
                                    type='button'
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    sign in
                                </button>;
                            })}
                    </>
                )}
            </div>

            {/* mobile navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src='/assets/images/logo.svg'
                            width={37}
                            height={37}
                            className='rounded-full cursor-pointer'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    my profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    create prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='w-full black_btn mt-5'
                                >
                                    sign out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                <button
                                    key={provider.name}
                                    type='button'
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    sign in
                                </button>;
                            })}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
