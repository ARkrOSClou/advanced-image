import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({
  attributes: {
    mediaURL,
    title,
    titleLevel,
    titleColor,
    text,
    //
  },
}) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      {mediaURL && <img src={mediaURL} />}

      {title && titleLevel && (
        <RichText.Content
          value={title}
          tagName={titleLevel}
          style={{ color: titleColor ?? undefined }}
        />
      )}

      {text && <RichText.Content tagName={"p"} value={text} />}
    </div>
  );
}
