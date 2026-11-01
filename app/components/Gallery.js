// Photo gallery with clickable thumbnails. Pure HTML/CSS (radio buttons), so it also works without JavaScript.
// `captions` (optional) labels each photo, e.g. its colour.
export default function Gallery({ name, images, captions = [] }) {
  if (!images?.length) return <div className="gallery-main weave" aria-hidden="true">Photography coming soon</div>;
  return (
    <div className="pdp-gallery">
      {images.map((src, i) => (
        <input key={src} type="radio" name="photo" id={`photo-${i}`} defaultChecked={i === 0} aria-label={captions[i] ?? `Photo ${i + 1} of ${images.length}`} />
      ))}
      <div className="gallery-main">
        {images.map((src, i) => (
          <figure key={src}>
            <img src={src} alt={captions[i] ? `${name} in ${captions[i]}` : `${name}, photo ${i + 1}`} width="900" height="675" />
            {captions[i] && <figcaption>{captions[i]}</figcaption>}
          </figure>
        ))}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, i) => <label key={src} htmlFor={`photo-${i}`}><img src={src} alt="" width="900" height="675" /></label>)}
        </div>
      )}
    </div>
  );
}
