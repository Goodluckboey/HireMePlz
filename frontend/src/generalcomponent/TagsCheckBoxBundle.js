import React, { useEffect, useState } from "react";
import tags from "../data/tags";
import { v4 as uuidv4 } from "uuid";

const TagsCheckBoxBundle = ({ handleData }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    tags.reduce((tags, tag) => ({ ...tags, [tag]: false }), {})
  );

  useEffect(() => {
    const tags = [];
    for (const [tag, value] of Object.entries(checkBoxes)) {
      if (value) {
        tags.push(tag);
      }
    }
    handleData(tags);
  }, [checkBoxes]);

  const tagsArray = tags.map((tag) => {
    return (
      <div key={uuidv4()}>
        <input
          type="checkbox"
          checked={checkBoxes[tag]}
          name={tag}
          onChange={(e) => {
            setCheckBoxes({ ...checkBoxes, [tag]: e.target.checked });
          }}
        />
        <label htmlFor={tag}>{tag}</label>
      </div>
    );
  });

  return <div>{tagsArray}</div>;
};

export default TagsCheckBoxBundle;
