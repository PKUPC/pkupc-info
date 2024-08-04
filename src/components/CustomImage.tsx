import { Image } from 'antd';

export default function CustomImage({ src, width, alt }: { src: string; width?: number; alt?: string }) {
    // console.log([src, width, alt]);
    let caption = undefined;
    if (alt && alt.startsWith('caption:')) {
        caption = alt.slice(8);
    }

    return (
        <>
            <div className={'flex justify-center flex-col items-center'}>
                <Image
                    src={src}
                    alt={alt ?? 'image'}
                    width={width}
                    className={'max-w-full'}
                    preview={{ getContainer: false }}
                />
                {caption && <div className={'text-gray-500 mt-1'}>{caption}</div>}
            </div>
            <br />
        </>
    );
}
