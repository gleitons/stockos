
import React from 'react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-30 z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                <div>
                    <Image className='rounded-md' src={'/gif-load.gif'} alt='carregando' width={100} height={100} />
                </div>
                <p className="mt-4 text-white text-lg font-semibold">Carregando...</p>
            </div>
        </div>
    );
}
