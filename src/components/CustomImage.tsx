import { Image } from 'antd';

export default function CustomImage({ src, width }: { src: string; width?: number }) {
    console.log([width, typeof width]);
    return (
        <>
            <div className={'flex justify-center'}>
                <Image src={src} alt={'image' + width} width={width} style={{ maxWidth: '100%' }} />
            </div>
            <br />
        </>
    );
}
