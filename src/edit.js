import {
  useBlockProps,
  MediaUpload,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  Panel,
  PanelRow,
  PanelBody,
  ButtonGroup,
  Button,
  ColorPicker,
} from "@wordpress/components";

export default function Edit({
  setAttributes,
  attributes: {
    mediaID,
    mediaURL,
    title,
    titleLevel,
    titleColor,
    text,
    //
  },
}) {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls key="settings">
        <Panel heading="Title Settings">
          <PanelBody title="Title" initialOpen={true}>
            <PanelRow>
              <fieldset>
                <legend className="blocks-base-control__label">Level</legend>
                <ButtonGroup>
                  {["h1", "h2", "h3", "h4", "h5", "h6"].map((level) => {
                    return (
                      <Button
                        variant={titleLevel === level ? "primary" : "secondary"}
                        onClick={() => {
                          setAttributes({
                            titleLevel: level,
                          });
                        }}
                      >
                        {level}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </fieldset>
            </PanelRow>
            <PanelRow>
              <fieldset>
                <legend className="blocks-base-control__label">Color</legend>
                <ColorPicker
                  color={titleColor}
                  onChange={(val) => {
                    setAttributes({
                      titleColor: val,
                    });
                  }}
                />
              </fieldset>
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>

      <MediaUpload
        type="image"
        value={mediaID}
        onSelect={(media) => {
          setAttributes({
            mediaURL: media.url,
            mediaID: media.id,
          });
        }}
        render={({ open }) => (
          <Button
            icon={mediaURL ? "update" : "upload"}
            variant={mediaURL ? "secondary" : "primary"}
            className={mediaURL ? "update" : "upload"}
            onClick={open}
            //
          >
            {!mediaURL && "Select Image"}
          </Button>
        )}
      />

      {!!mediaURL && <img src={mediaURL} />}

      <RichText
        placeholder="Title"
        tagName={titleLevel}
        allowedFormats={[]}
        style={{ color: titleColor }}
        value={title}
        onChange={(val) => {
          setAttributes({ title: val });
        }}
      />

      <RichText
        placeholder="Text"
        tagName="p"
        value={text}
        onChange={(val) => {
          setAttributes({ text: val });
        }}
      />
    </div>
  );
}
