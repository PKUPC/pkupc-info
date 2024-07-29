export default function CustomImage({ src, width }: { src: string; width?: number }) {
    return <img src={src} alt={'image' + width} style={{ maxWidth: '100%', width: width + 'px' }} />;
}
