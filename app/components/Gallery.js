// Photo gallery with clickable thumbnails. Pure HTML/CSS (radio buttons), so it also works without JavaScript.
export default function Gallery({ name, images }) {
  if (!images?.length) return <div className="gallery-main weave" aria-hidden="true">Photography coming soon</div>;
  return (
    <div className="pdp-gallery">
      {images.map((src, i) => (
        <input key={src} type="radio" name="photo" id={`photo-${i}`} defaultChecked={i === 0} aria-label={`Photo ${i + 1} of ${images.length}`} />
      ))}
      <div className="gallery-main">
        {images.map((src, i) => <img key={src} src={src} alt={`${name}, photo ${i + 1}`} width="900" height="675" />)}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, i) => <label key={src} htmlFor={`photo-${i}`}><img src={src} alt="" width="900" height="675" /></label>)}
        </div>
      )}
    </div>
  );
}
